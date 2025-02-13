import '@@/config';
import moment from 'moment';
import { z } from 'zod';
import Promise from 'bluebird';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import { ChatPromptTemplate } from '@langchain/core/prompts';

import * as DocumentRepository from '@@/services/mongo/repositories/Document';
import * as UserRepository from '@@/services/mongo/repositories/User';
import { modelName, user, temperature } from '@@/constants/gpt';
import { Genders, MaritalStatuses } from '@@/constants/user';
import { MeasureTypes } from '@@/constants/measure';
import { getDocumentContent } from '@@/utils/document';

const MeasureSchema = z.object({
  type: z
    .nativeEnum(MeasureTypes)
    .describe(
      'Type de mesure de protection juridique (ex. tutelle, curatelle).',
    ),
  duration: z
    .number()
    .optional()
    .describe('Durée de la mesure de protection en mois.'),
  motive: z.string().describe('Motif de la mesure de protection.'),
  judgment: z
    .object({
      date: z
        .string()
        .optional()
        .describe('Date du jugement au format DD/MM/YYYY.'),
      court: z
        .object({
          name: z.string().describe('Nom du tribunal.'),
          service: z.string().optional().describe('Service du tribunal.'),
          address: z.string().optional().describe('Adresse du tribunal.'),
          postcode: z.string().optional().describe('Code postal du tribunal.'),
          city: z.string().optional().describe('Ville du tribunal.'),
          phone: z.string().optional().describe('Téléphone du tribunal.'),
          fax: z.string().optional().describe('Fax du tribunal.'),
        })
        .optional()
        .describe('Tribunal ayant prononcé la mesure de protection.'),
      attendees: z
        .array(
          z.object({
            name: z.string().describe('Nom de la personne présente.'),
            role: z
              .string()
              .optional()
              .describe('Rôle de la personne présente.'),
          }),
        )
        .optional()
        .describe('Liste des personnes présentes lors du jugement.'),
    })
    .optional()
    .describe('Jugement ayant prononcé la mesure de protection.'),
  startDate: z
    .string()
    .optional()
    .describe('Date de début de la mesure de protection au format DD/MM/YYYY.'),
  endDate: z
    .string()
    .optional()
    .describe(
      'Date de fin de la mesure de protection, si applicable au format DD/MM/YYYY.',
    ),
});

const RealEstatePropertySchema = z.object({
  address: z.string().optional().describe('Adresse du bien immobilier.'),
  city: z.string().optional().describe('Ville où se situe le bien immobilier.'),
  postcode: z.string().optional().describe('Code postal du bien immobilier.'),
  country: z
    .string()
    .optional()
    .describe('Pays où se situe le bien immobilier.'),
  value: z
    .number()
    .optional()
    .describe('Valeur estimée ou réelle du bien immobilier (en euros).'),
  floorArea: z
    .number()
    .optional()
    .describe('Surface habitable du bien immobilier (en m²).'),
  landArea: z
    .number()
    .optional()
    .describe('Surface totale du terrain associé au bien immobilier (en m²).'),
  purchaseDate: z
    .string()
    .optional()
    .describe("Date d'achat du bien immobilier au format DD/MM/YYYY."),
  saleDate: z
    .string()
    .optional()
    .describe(
      'Date de vente du bien immobilier, si applicable au format DD/MM/YYYY.',
    ),
  deductions: z
    .array(
      z.object({
        value: z.number().describe('Montant de la déduction (en euros).'),
        label: z.string().describe('Description ou catégorie de la déduction.'),
      }),
    )
    .describe('Liste des déductions appliquées au bien immobilier.'),
});

const PersonalPropertySchema = z.object({
  label: z.string().describe("Description ou nom de l'objet personnel."),
  value: z
    .number()
    .optional()
    .describe("Valeur estimée de l'objet personnel (en euros)."),
});

const DebtSchema = z.object({
  label: z.string().describe('Nom ou description de la dette.'),
  amount: z
    .number()
    .optional()
    .describe('Montant total de la dette (en euros).'),
  schedule: z
    .array(
      z.object({
        date: z.string().describe("Date de l'échéance au format DD/MM/YYYY."),
        amortization: z
          .number()
          .optional()
          .describe('Montant amorti pour cette échéance (en euros).'),
        interest: z
          .number()
          .optional()
          .describe('Montant des intérêts pour cette échéance (en euros).'),
      }),
    )
    .describe('Calendrier des échéances pour la dette.'),
});

const outputParser = z.object({
  gender: z.nativeEnum(Genders).optional().describe("Genre de l'utilisateur."),
  nationality: z
    .string()
    .optional()
    .describe('Nationalité de la personne protégée.'),
  address: z
    .string()
    .optional()
    .describe('Adresse complète de la personne protégée.'),
  city: z
    .string()
    .optional()
    .describe('Ville de résidence de la personne protégée.'),
  postcode: z
    .string()
    .optional()
    .describe('Code postal de la personne protégée.'),
  country: z
    .string()
    .optional()
    .describe('Pays de résidence de la personne protégée.'),
  birthDate: z
    .string()
    .optional()
    .describe('Date de naissance de la personne protégé au format DD/MM/YYYY.'),
  cityOfBirth: z
    .string()
    .optional()
    .describe('Ville de naissance de la personne protégée.'),
  nationalInsuranceNumber: z
    .string()
    .optional()
    .describe('Numéro de sécurité sociale de la personne protégée.'),
  taxIndentificationNumber: z
    .string()
    .optional()
    .describe("Numéro d'identification fiscale de la personne protégée."),
  gir: z
    .string()
    .optional()
    .describe('GIR (Groupe Iso-Ressources) de la personne protégée'),
  alone: z
    .boolean()
    .optional()
    .describe('Indique si la personne protégée vit seul.'),
  pets: z
    .boolean()
    .optional()
    .describe('Indique si la personne protégée possède des animaux.'),
  religion: z.string().optional().describe('Religion de la personne protégée.'),
  maritalStatus: z
    .nativeEnum(MaritalStatuses)
    .optional()
    .describe('Statut marital de la personne protégée.'),
  children: z
    .number()
    .optional()
    .describe("Nombre d'enfants de la personne protégée."),
  measures: z
    .array(MeasureSchema)
    .optional()
    .describe(
      'Liste des mesures de protection associées à la personne protégée.',
    ),
  realEstateProperties: z
    .array(RealEstatePropertySchema)
    .optional()
    .describe('Liste des biens immobiliers de la personne protégée.'),
  personalProperties: z
    .array(PersonalPropertySchema)
    .optional()
    .describe('Liste des biens personnels de la personne protégée.'),
  debts: z
    .array(DebtSchema)
    .optional()
    .describe('Liste des dettes de la personne protégée.'),
});

const chatModel = new ChatOpenAI({
  modelName,
  temperature,
  user,
});

const prompt = `
    Tu es mandataire responsable d'une personne sous mesure de protection juridique.
    Tu es chargé d'extraire les informations qui lui sont relatives à partir des documents qui te sont transmis.
`;

export const extractIntelsFromDocumentsForUser = async (userId: string) => {
  const documents = await DocumentRepository.findAllDocumentsBy({
    userId,
    type: {
      $nin: ['signature', 'avatar'],
    },
  });

  const preparedDocuments = await Promise.map(
    documents,
    async (doc: SH.Document) => getDocumentContent(doc),
    { concurrency: 2 },
  );

  const messages = [['system', prompt]] as any[];

  for (const documents of preparedDocuments) {
    for (const document of documents) {
      const content = [];

      if (document.data) {
        content.push({
          type: 'text',
          text: `Title: ${document.title}\n\nContent:\n${document.data}`,
        });
      }

      if (document.b64Images) {
        for (const b64Image of document.b64Images) {
          content.push({
            type: 'image_url',
            image_url: {
              url: b64Image,
            },
          });
        }
      }

      messages.push(new HumanMessage({ content }));
    }
  }

  const multiModalPrompt = ChatPromptTemplate.fromMessages(messages);
  const chain = multiModalPrompt.pipe(
    chatModel.withStructuredOutput(outputParser, {
      includeRaw: true,
    }),
  );
  const { parsed } = await chain.invoke({});

  if (parsed?.measures) {
    for (const measure of parsed?.measures) {
      if (!measure.endDate && measure.duration) {
        measure.endDate = moment(measure.startDate, 'DD/MM/YYYY')
          .add(measure.duration, 'months')
          .format('DD/MM/YYYY');
      }
    }
  }

  const user = await UserRepository.findUserByIdOrThrow(userId);

  const payload: Partial<SH.User> = {};
  for (const key of Object.keys(parsed)) {
    if (parsed[key as keyof typeof parsed] && user[key] == undefined) {
      payload[key as keyof SH.User] = parsed[key as keyof typeof parsed];
    }
  }

  await UserRepository.updateUserById(userId, payload);
};
