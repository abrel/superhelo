import React, { useMemo } from 'react';
import * as yup from 'yup';
import { useFieldArray } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';
import {
  selectInputGenders,
  selectInputMaritalStatuses,
} from '@@/constants/user';
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
        type: yup
          .object({
            id: yup.string(),
            label: yup.string(),
          })
          .required(),
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

  const [photoInput, gender, maritalStatus] = watch([
    'photo',
    'gender',
    'maritalStatus',
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

  return (
    <form className="mt-4">
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
            className="mt-14 mb-6"
          />
          <div className="flex flex-col mt-6 w-fit">
            {!trustedContactFields?.length && (
              <p className="font-main text-main flex flex-row items-center">
                <IoWarningOutline size={24} />
                <span className="mx-1">
                  Aucun mot contact de confiance ajouté
                </span>
                <IoWarningOutline size={24} />
              </p>
            )}
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
        </div>
      )}
    </form>
  );
};

export default WardForm;
