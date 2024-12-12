import Joi from 'joi';
import { Roles, Genders, MaritalStatuses } from '@@/constants/user';
import { DocumentTypes } from '@@/constants/document';
import { MeasureTypes } from '@@/constants/measure';

export const loginValidationSchema = Joi.object({
  email: Joi.string()
    .lowercase()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.values(Roles))
    .required(),
}).required();

export const refreshTokenValidationSchema = Joi.object({
  refreshToken: Joi.string().required(),
}).required();

export const resetPasswordValidationSchema = Joi.object({
  email: Joi.string()
    .lowercase()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  role: Joi.string()
    .valid(...Object.values(Roles))
    .required(),
}).required();

export const changePasswordValidationSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().required(),
}).required();

const userValidationSchema = {
  gender: Joi.string().valid(...Object.values(Genders)),
  address: Joi.string().trim(),
  postcode: Joi.string().trim(),
  city: Joi.string().trim(),
  country: Joi.string().trim(),
  birthDate: Joi.date(),
  cityOfBirth: Joi.string().trim(),
  maritalStatus: Joi.string().valid(...Object.values(MaritalStatuses)),
  children: Joi.number().min(0),
  nationality: Joi.string().trim(),
  nationalInsuranceNumber: Joi.string().trim(),
  taxIndentificationNumber: Joi.string().trim(),
  gir: Joi.string().trim(),
  religion: Joi.string().trim(),
  alone: Joi.boolean(),
  pets: Joi.boolean(),
  trustedContacts: Joi.array().items(
    Joi.object({
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      email: Joi.string()
        .lowercase()
        .trim()
        .email({ tlds: { allow: false } })
        .required(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .trim()
        .required(),
    }),
  ),
  measures: Joi.array().items(
    Joi.object({
      type: Joi.string()
        .valid(...Object.values(MeasureTypes))
        .required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().min(Joi.ref('startDate')).optional(),
      motive: Joi.string(),
      judgment: Joi.object({
        date: Joi.date(),
        court: Joi.object({
          name: Joi.string().required(),
          service: Joi.string(),
          address: Joi.string(),
          postcode: Joi.string(),
          city: Joi.string(),
          country: Joi.string(),
          phone: Joi.string(),
          fax: Joi.string(),
        }),
        attendees: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              role: Joi.string(),
            }),
          )
          .optional(),
      }),
      documentIds: Joi.array()
        .items(Joi.string().regex(/^[a-f\d]{24}$/i))
        .optional(),
    }),
  ),
  realEstateProperties: Joi.array().items(
    Joi.object({
      address: Joi.string(),
      city: Joi.string(),
      postcode: Joi.string(),
      country: Joi.string().optional(),
      value: Joi.number().optional().min(0),
      floorArea: Joi.number().optional().min(0),
      landArea: Joi.number().optional().min(0),
      purchaseDate: Joi.date().optional(),
      saleDate: Joi.date().optional().min(Joi.ref('purchaseDate')).messages({
        'date.min':
          "La date de vente doit être postérieure ou égale à la date d'achat.",
      }),
      deductions: Joi.array().items(
        Joi.object({
          value: Joi.number().required().min(0),
          label: Joi.string().required(),
        }),
      ),
      documentIds: Joi.array()
        .items(Joi.string().regex(/^[a-f\d]{24}$/i))
        .optional(),
    }),
  ),
  personalProperties: Joi.array().items(
    Joi.object({
      label: Joi.string().required(),
      value: Joi.number().required().min(0),
      documentIds: Joi.array()
        .items(Joi.string().regex(/^[a-f\d]{24}$/i))
        .optional(),
    }),
  ),
  debts: Joi.array().items(
    Joi.object({
      label: Joi.string().required(),
      amount: Joi.number().required().min(0),
      schedule: Joi.array().items(
        Joi.object({
          date: Joi.date().required(),
          amortization: Joi.number().required().min(0),
          interest: Joi.number().required().min(0),
        }),
      ),
      documentIds: Joi.array()
        .items(Joi.string().regex(/^[a-f\d]{24}$/i))
        .optional(),
    }),
  ),
  passwords: Joi.array().items(
    Joi.object({
      label: Joi.string().required(),
      username: Joi.string().required(),
      value: Joi.string().required(),
    }),
  ),
};

export const createhUserValidationSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string()
    .lowercase()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .trim()
    .required(),
  role: Joi.string()
    .valid(...Object.values(Roles))
    .default(Roles.GUARDIAN),
  password: Joi.string().min(6).required(),

  ...userValidationSchema,
}).required();

export const patchUserValidationSchema = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  email: Joi.string()
    .lowercase()
    .trim()
    .email({ tlds: { allow: false } })
    .allow(null),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .trim(),
  role: Joi.string().valid(...Object.values(Roles)),
  ...userValidationSchema,
}).required();

export const searchValidationSchema = Joi.object({
  s: Joi.string().required().min(3),
}).required();

export const patchDocumentValidationSchema = Joi.object({
  label: Joi.string(),
  isPrivate: Joi.boolean(),
  type: Joi.string().valid(...Object.values(DocumentTypes)),
}).required();
