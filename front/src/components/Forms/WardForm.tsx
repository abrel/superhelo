import React, { useMemo } from 'react';
import * as yup from 'yup';
import { useFieldArray } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoIosAddCircleOutline } from 'react-icons/io';
import {
  selectInputGenders,
  selectInputMaritalStatuses,
} from '@@/constants/user';
import { selectInputMeasureTypes } from '@@/constants/measure';
import AuthenticatedImage from '@@/components/AuthenticatedImage';
import StandardInput from '@@/components/Inputs/StandardInput';
import MultiSelectInput from '@@/components/Inputs/MultiSelectInput';
import PhonePickerInput from '@@/components/Inputs/PhonePickerInput';
import DatePickerInput from '@@/components/Inputs/DatePickerInput';
import CheckboxInput from '@@/components/Inputs/CheckboxInput';
import SectionTitle from '@@/components/SectionTitle';

export type WardFormType = any;

export const schema = yup
  .object({
    firstName: yup
      .string()
      .required('Veuillez entrer le prénom de votre protégé'),
    lastName: yup.string().required('Veuillez entrer le nom de votre protégé'),
    email: yup
      .string()
      .email('Veuillez entrer un email valide')
      .required(`Veuillez entrer l'email de votre protégé`),
    phone: yup
      .string()
      .required('Veuillez entrer le numéro de téléphone de votre protégé'),
    gender: yup.object({
      id: yup.string(),
      label: yup.string(),
    }),
    birthDate: yup.date(),
    cityOfBirth: yup.string(),
    address: yup.string(),
    postcode: yup.string(),
    city: yup.string(),
    country: yup.string(),
    maritalStatus: yup.object({
      id: yup.string(),
      label: yup.string(),
    }),
    children: yup
      .number()
      .min(0)
      .max(20)
      .nullable()
      .transform((_, val?: number) => {
        if (val) {
          return Number(val);
        }
      }),
    nationalInsuranceNumber: yup.string(),
    taxIndentificationNumber: yup.string(),
    gir: yup.string(),
    religion: yup.string(),
    trustedContacts: yup.array().of(
      yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().required(),
      }),
    ),
    measures: yup.array().of(
      yup.object({
        type: yup.object({
          id: yup.string(),
          label: yup.string(),
        }),
        startDate: yup.date().required(),
        endDate: yup.string().nullable(),
        motive: yup.string(),
        judgment: yup.object({
          date: yup.string(),
          court: yup.object({
            name: yup.string(),
            service: yup.string(),
            address: yup.string(),
            postcode: yup.string(),
            city: yup.string(),
            country: yup.string(),
            phone: yup.string(),
            fax: yup.string(),
          }),
        }),
      }),
    ),
    personalProperties: yup.array().of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.number().required().min(0, 'Value must be at least 0'),
      }),
    ),
    debts: yup.array().of(
      yup.object().shape({
        label: yup.string().required(),
        amount: yup.number().required().min(0, 'Amount must be at least 0'),
      }),
    ),
    realEstateProperties: yup.array().of(
      yup.object().shape({
        address: yup.string().optional(),
        city: yup.string().optional(),
        postcode: yup.string().optional(),
        country: yup.string().optional(),
        value: yup.number().optional().min(0, 'Value must be at least 0'),
        floorArea: yup
          .number()
          .optional()
          .min(0, 'Floor area must be at least 0'),
        landArea: yup
          .number()
          .optional()
          .min(0, 'Land area must be at least 0'),
        purchaseDate: yup.date().optional(),
        saleDate: yup
          .date()
          .min(
            yup.ref('purchaseDate'),
            'Sale date must be after or equal to the purchase date',
          )
          .optional(),
      }),
    ),
    passwords: yup.array().of(
      yup.object().shape({
        label: yup.string().required(),
        username: yup.string().required(),
        value: yup.string().required(),
      }),
    ),
  })
  .required();

const WardForm: React.FC<{
  form: any;
  isNew: boolean;
}> = ({ form, isNew }) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  const [photoInput, gender, maritalStatus, measures] = watch([
    'photo',
    'gender',
    'maritalStatus',
    'measures',
  ]);

  const photo: string = useMemo(() => {
    if (typeof photoInput === 'string') {
      return photoInput;
    }
    if (photoInput?.[0] instanceof File) {
      return URL.createObjectURL(photoInput[0]);
    }
    return '/user-profile-placeholder.jpg';
  }, [photoInput]);

  const {
    fields: trustedContactFields,
    append: appendTrustedContact,
    remove: removeTrustedContact,
  } = useFieldArray({
    control,
    name: 'trustedContacts',
  });

  const {
    fields: measureFields,
    append: appendMeasure,
    remove: removeMeasure,
  } = useFieldArray({
    control,
    name: 'measures',
  });

  const {
    fields: realEstatePropertyFields,
    append: appendRealEstateProperty,
    remove: removeRealEstateProperty,
  } = useFieldArray({
    control,
    name: 'realEstateProperties',
  });

  const {
    fields: personalPropertyFields,
    append: appendPersonalProperty,
    remove: removePersonalProperty,
  } = useFieldArray({
    control,
    name: 'personalProperties',
  });

  const {
    fields: debtFields,
    append: appendDebt,
    remove: removeDebt,
  } = useFieldArray({
    control,
    name: 'debts',
  });

  const {
    fields: passwordFields,
    append: appendPassword,
    remove: removePassword,
  } = useFieldArray({
    control,
    name: 'passwords',
  });

  return (
    <form className="">
      <SectionTitle title="Informations Personnelles" className="mb-10" />
      <div className="mb-12 flex flex-row items-center">
        <label htmlFor="photo">
          <AuthenticatedImage
            className="object-cover h-24 w-24 sm:h-40 sm:w-40 bg-white rounded-full"
            alt="patient-photo"
            placeholder={photo}
          />

          <input
            {...register('photo')}
            type="file"
            id="photo"
            className="hidden"
          />
        </label>

        <div className="flex flex-col w-fit">
          <div className="flex flex-row">
            <div className="grow-0 mx-8 -mt-6">
              <MultiSelectInput
                control={control}
                id="gender"
                label="Genre"
                values={gender}
                options={selectInputGenders}
                isMulti={false}
              />
            </div>
            <div className="grow-0 mx-8">
              <StandardInput
                register={register}
                id="firstName"
                label="Prénom (*)"
                type="text"
                placeholder="Prénom (*)"
                error={errors.firstName}
              />
            </div>
            <div className="grow-0">
              <StandardInput
                register={register}
                id="lastName"
                label="Nom (*)"
                type="text"
                placeholder="Nom (*)"
                error={errors.lastName}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-12">
        <StandardInput
          register={register}
          id="email"
          label="Email (*)"
          type="text"
          placeholder="Email (*)"
          error={errors.email}
        />
        <PhonePickerInput
          control={control}
          id="phone"
          error={errors.phone}
          label="Téléphone (*)"
        />
        <StandardInput
          register={register}
          id="address"
          label="Adresse"
          type="text"
          placeholder="Adresse"
          error={errors.address}
        />
        <StandardInput
          register={register}
          id="postcode"
          label="Code postal"
          type="text"
          placeholder="Code postal"
          error={errors.postcode}
        />
        <StandardInput
          register={register}
          id="city"
          label="Ville"
          type="text"
          placeholder="Ville"
          error={errors.city}
        />
        <StandardInput
          register={register}
          id="country"
          label="Pays"
          type="text"
          placeholder="Pays"
          error={errors.country}
        />
        <DatePickerInput
          id="birthDate"
          control={control}
          label="Date de naissance"
          error={errors.birthDate}
        />
        <StandardInput
          register={register}
          id="cityOfBirth"
          label="Ville de naissance"
          type="text"
          placeholder="Ville de naissance"
          error={errors.cityOfBirth}
        />
        <StandardInput
          register={register}
          id="nationalInsuranceNumber"
          label="Numéro de S. Sociale"
          type="text"
          placeholder="Numéro de S. Sociale"
          error={errors.nationalInsuranceNumber}
        />
        <StandardInput
          register={register}
          id="taxIndentificationNumber"
          label="Numéro Fiscal"
          type="text"
          placeholder="Numéro Fiscal"
          error={errors.taxIndentificationNumber}
        />
        <StandardInput
          register={register}
          id="gir"
          label="Groupe Iso-Ressources"
          type="text"
          placeholder="Groupe Iso-Ressources"
          error={errors.gir}
        />
        <StandardInput
          register={register}
          id="religion"
          label="Religion"
          type="text"
          placeholder="Religion"
          error={errors.religion}
        />
        <div className="grow-0 mx-8 -mt-6">
          <MultiSelectInput
            control={control}
            id="maritalStatus"
            label="Situation Familiale"
            values={maritalStatus}
            options={selectInputMaritalStatuses}
            isMulti={false}
            error={errors.maritalStatus}
          />
        </div>

        <StandardInput
          register={register}
          id="children"
          label="Nombre d'enfants"
          type="number"
          placeholder="Nombre d'enfants"
          error={errors.children}
        />

        <CheckboxInput
          register={register}
          id="alone"
          label="Le protégé vit seul"
        />
        <CheckboxInput
          register={register}
          id="pets"
          label="Présence d'animaux"
        />
      </div>

      {!isNew && (
        <div>
          <SectionTitle
            title="Contact(s) de confiance"
            className="mt-14 mb-10"
          />
          <div className="flex flex-col mt-6 w-fit">
            <ul className="flex flex-col space-y-6">
              {trustedContactFields.map((field: any, index: number) => (
                <div key={index} className="mt-2">
                  <div className="flex flex-row items-center">
                    <p className="font-main text-main underline">
                      Contact de confiance {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeTrustedContact(index)}
                      className="ml-4"
                    >
                      <RiDeleteBinLine
                        size={24}
                        className="bg-red-500 p-1 rounded-full text-white"
                      />
                    </button>
                  </div>

                  <div className="mt-8 grid grid-cols-4 gap-10">
                    <StandardInput
                      register={register}
                      type="text"
                      id={`trustedContacts[${index}].firstName`}
                      error={errors.trustedContacts?.[index]?.firstName}
                      label={`Prénom #${index + 1}`}
                      placeholder="Prénom"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`trustedContacts[${index}].lastName`}
                      error={errors.trustedContacts?.[index]?.lastName}
                      label={`Nom #${index + 1}`}
                      placeholder="Nom"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`trustedContacts[${index}].email`}
                      error={errors.trustedContacts?.[index]?.email}
                      label={`Email #${index + 1}`}
                      placeholder="Email"
                    />
                    <PhonePickerInput
                      control={control}
                      id={`trustedContacts[${index}].phone`}
                      error={errors.trustedContacts?.[index]?.phone}
                      label=""
                    />
                  </div>
                </div>
              ))}
            </ul>

            <button
              type="button"
              className="mt-10 py-2 px-3 bg-cyan-400 text-white rounded-xl font-main text-base flex flex-row items-center w-fit"
              onClick={() => appendTrustedContact({})}
            >
              <IoIosAddCircleOutline size={24} />
              <span className="ml-2">Ajouter un contact de confiance</span>
            </button>
          </div>
          <SectionTitle title="Mesure(s) Associée(s)" className="mt-14 mb-10" />
          <div className="flex flex-col mt-6 w-fit">
            <ul className="flex flex-col space-y-6">
              {measureFields.map((field: any, index: number) => (
                <div key={index} className="mt-2">
                  <div className="flex flex-row items-center">
                    <p className="font-main text-main underline">
                      Mesure {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeMeasure(index)}
                      className="ml-4"
                    >
                      <RiDeleteBinLine
                        size={24}
                        className="bg-red-500 p-1 rounded-full text-white"
                      />
                    </button>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-10 mb-10">
                    <MultiSelectInput
                      control={control}
                      id={`measures[${index}].type`}
                      label="Type de mesure (*)"
                      values={measures[index].type}
                      options={selectInputMeasureTypes}
                      isMulti={false}
                    />
                    <div className="mt-6">
                      <DatePickerInput
                        id={`measures[${index}].startDate`}
                        control={control}
                        label="Date de démarage (*)"
                        error={errors.measures?.[index]?.startDate}
                      />
                    </div>
                    <div className="mt-6">
                      <DatePickerInput
                        id={`measures[${index}].endDate`}
                        control={control}
                        label="Date de fin"
                        error={errors.measures?.[index]?.endDate}
                      />
                    </div>
                  </div>
                  <StandardInput
                    register={register}
                    type="textarea"
                    id={`measures[${index}].motive`}
                    error={errors.measures?.[index]?.motive}
                    label="Motif"
                    placeholder="Motif"
                  />

                  <p className="mt-6 mb-8 py-2 border-b border-t font-main text-main">
                    Jugement
                  </p>

                  <div className=" grid grid-cols-3 gap-10 mb-10">
                    <StandardInput
                      register={register}
                      type="text"
                      id={`measures[${index}].judgment.court.name`}
                      error={errors.measures?.[index]?.court?.name}
                      label="Tribunal"
                      placeholder="Tribunal"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`measures[${index}].judgment.court.service`}
                      error={errors.measures?.[index]?.court?.service}
                      label="Service"
                      placeholder="Service"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`measures[${index}].judgment.court.address`}
                      error={errors.measures?.[index]?.court?.address}
                      label="Adresse"
                      placeholder="Adresse"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`measures[${index}].judgment.court.postcode`}
                      error={errors.measures?.[index]?.court?.postcode}
                      label="Code Postal"
                      placeholder="Code Postal"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`measures[${index}].judgment.court.city`}
                      error={errors.measures?.[index]?.court?.city}
                      label="Ville"
                      placeholder="Ville"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`measures[${index}].judgment.court.country`}
                      error={errors.measures?.[index]?.court?.country}
                      label="Pays"
                      placeholder="Pays"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`measures[${index}].judgment.court.phone`}
                      error={errors.measures?.[index]?.court?.phone}
                      label="Tel"
                      placeholder="Tel"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`measures[${index}].judgment.court.fax`}
                      error={errors.measures?.[index]?.court?.fax}
                      label="Fax"
                      placeholder="Fax"
                    />

                    <DatePickerInput
                      id={`measures[${index}].judgment.date`}
                      control={control}
                      label="Date du jugement"
                      error={errors.measures?.[index]?.judgment?.date}
                    />
                  </div>
                </div>
              ))}
            </ul>

            <button
              type="button"
              className="mt-10 py-2 px-3 bg-cyan-400 text-white rounded-xl font-main text-base flex flex-row items-center w-fit"
              onClick={() => appendMeasure({})}
            >
              <IoIosAddCircleOutline size={24} />
              <span className="ml-2">Ajouter une mesure</span>
            </button>
          </div>

          <SectionTitle title="Inventaire" className="mt-14 mb-10" />
          <div className="flex flex-col mt-6 w-fit">
            <ul className="flex flex-col space-y-6">
              {realEstatePropertyFields.map((field: any, index: number) => (
                <div key={index} className="mt-2">
                  <div className="flex flex-row items-center">
                    <p className="font-main text-main underline">
                      Bien immobilier {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeRealEstateProperty(index)}
                      className="ml-4"
                    >
                      <RiDeleteBinLine
                        size={24}
                        className="bg-red-500 p-1 rounded-full text-white"
                      />
                    </button>
                  </div>

                  <div className="mt-8 grid grid-cols-4 gap-10">
                    <StandardInput
                      register={register}
                      type="text"
                      id={`realEstateProperties[${index}].address`}
                      error={errors.realEstateProperties?.[index]?.address}
                      label="Adresse"
                      placeholder="Adresse"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`realEstateProperties[${index}].city`}
                      error={errors.realEstateProperties?.[index]?.city}
                      label="Ville"
                      placeholder="Ville"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`realEstateProperties[${index}].postcode`}
                      error={errors.realEstateProperties?.[index]?.postcode}
                      label="Code Postal"
                      placeholder="Code Postal"
                    />
                    <StandardInput
                      register={register}
                      type="number"
                      id={`realEstateProperties[${index}].landArea`}
                      error={errors.realEstateProperties?.[index]?.landArea}
                      label="Superficie"
                      placeholder="Superficie"
                    />
                    <StandardInput
                      register={register}
                      type="number"
                      id={`realEstateProperties[${index}].value`}
                      error={errors.realEstateProperties?.[index]?.value}
                      label="Valeur estimée"
                      placeholder="Valeur estimée"
                    />
                    <DatePickerInput
                      id={`realEstateProperties[${index}].purchaseDate`}
                      control={control}
                      label="Date d'achat (*)"
                      error={errors.realEstateProperties?.[index]?.purchaseDate}
                    />
                    <DatePickerInput
                      id={`realEstateProperties[${index}].saleDate`}
                      control={control}
                      label="Date de vente"
                      error={errors.realEstateProperties?.[index]?.saleDate}
                    />
                  </div>
                </div>
              ))}
            </ul>

            <button
              type="button"
              className="mt-10 py-2 px-3 bg-cyan-400 text-white rounded-xl font-main text-base flex flex-row items-center w-fit"
              onClick={() => appendRealEstateProperty({})}
            >
              <IoIosAddCircleOutline size={24} />
              <span className="ml-2">Ajouter un bien immobilier</span>
            </button>
          </div>
          <div className="flex flex-col mt-6 w-fit">
            <ul className="flex flex-col space-y-6">
              {personalPropertyFields.map((field: any, index: number) => (
                <div key={index} className="mt-2">
                  <div className="flex flex-row items-center">
                    <p className="font-main text-main underline">
                      Bien mobilier {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removePersonalProperty(index)}
                      className="ml-4"
                    >
                      <RiDeleteBinLine
                        size={24}
                        className="bg-red-500 p-1 rounded-full text-white"
                      />
                    </button>
                  </div>

                  <div className="mt-8 grid grid-cols-4 gap-10">
                    <StandardInput
                      register={register}
                      type="text"
                      id={`personalProperties[${index}].label`}
                      error={errors.realEstateProperties?.[index]?.label}
                      label="Intitulé (*)"
                      placeholder="Intitulé (*)"
                    />
                    <StandardInput
                      register={register}
                      type="number"
                      id={`personalProperties[${index}].value`}
                      error={errors.personalProperties?.[index]?.value}
                      label="Valeur estimée"
                      placeholder="Valeur estimée"
                    />
                  </div>
                </div>
              ))}
            </ul>

            <button
              type="button"
              className="mt-10 py-2 px-3 bg-cyan-400 text-white rounded-xl font-main text-base flex flex-row items-center w-fit"
              onClick={() => appendPersonalProperty({})}
            >
              <IoIosAddCircleOutline size={24} />
              <span className="ml-2">Ajouter un bien mobilier</span>
            </button>
          </div>
          <div className="flex flex-col mt-6 w-fit">
            <ul className="flex flex-col space-y-6">
              {debtFields.map((field: any, index: number) => (
                <div key={index} className="mt-2">
                  <div className="flex flex-row items-center">
                    <p className="font-main text-main underline">
                      Dette {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeDebt(index)}
                      className="ml-4"
                    >
                      <RiDeleteBinLine
                        size={24}
                        className="bg-red-500 p-1 rounded-full text-white"
                      />
                    </button>
                  </div>

                  <div className="mt-8 grid grid-cols-4 gap-10">
                    <StandardInput
                      register={register}
                      type="text"
                      id={`debts[${index}].label`}
                      error={errors.debts?.[index]?.label}
                      label="Intitulé (*)"
                      placeholder="Intitulé (*)"
                    />
                    <StandardInput
                      register={register}
                      type="number"
                      id={`debts[${index}].amount`}
                      error={errors.debts?.[index]?.amount}
                      label="Montant"
                      placeholder="Montant"
                    />
                  </div>
                </div>
              ))}
            </ul>

            <button
              type="button"
              className="mt-10 py-2 px-3 bg-cyan-400 text-white rounded-xl font-main text-base flex flex-row items-center w-fit"
              onClick={() => appendDebt({})}
            >
              <IoIosAddCircleOutline size={24} />
              <span className="ml-2">Ajouter une dette</span>
            </button>
          </div>

          <SectionTitle title="Mots de passe" className="mt-14 mb-10" />
          <div className="flex flex-col mt-6 w-fit">
            <ul className="flex flex-col space-y-6">
              {passwordFields.map((field: any, index: number) => (
                <div key={index} className="mt-2">
                  <div className="flex flex-row items-center">
                    <p className="font-main text-main underline">
                      Mot de passe {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removePassword(index)}
                      className="ml-4"
                    >
                      <RiDeleteBinLine
                        size={24}
                        className="bg-red-500 p-1 rounded-full text-white"
                      />
                    </button>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-10">
                    <StandardInput
                      register={register}
                      type="text"
                      id={`passwords[${index}].label`}
                      error={errors.passwords?.[index]?.label}
                      label="Intitulé (*)"
                      placeholder="Intitulé (*)"
                    />
                    <StandardInput
                      register={register}
                      type="text"
                      id={`passwords[${index}].username`}
                      error={errors.passwords?.[index]?.username}
                      label="Identifiant"
                      placeholder="Identifiant"
                    />
                    <StandardInput
                      register={register}
                      type="password"
                      id={`passwords[${index}].value`}
                      error={errors.passwords?.[index]?.value}
                      label="Mot de passe"
                      placeholder="Mot de passe"
                    />
                  </div>
                </div>
              ))}
            </ul>

            <button
              type="button"
              className="mt-10 py-2 px-3 bg-cyan-400 text-white rounded-xl font-main text-base flex flex-row items-center w-fit"
              onClick={() => appendPassword({})}
            >
              <IoIosAddCircleOutline size={24} />
              <span className="ml-2">Ajouter un mot de passe</span>
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default WardForm;
