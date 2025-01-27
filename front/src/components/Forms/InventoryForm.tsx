import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoIosAddCircleOutline } from 'react-icons/io';
import StandardInput from '@@/components/Inputs/StandardInput';
import DatePickerInput from '@@/components/Inputs/DatePickerInput';
import SectionTitle from '@@/components/SectionTitle';

const InventoryForm: React.FC<{ form: any }> = ({ form }) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

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

  return (
    <div className="flex flex-col w-fit">
      <SectionTitle title="Bien(s) Immobilier(s)" className="mt-6 mb-4" />
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

      <SectionTitle title="Bien(s) Mobilier(s)" className="mt-12 mb-4" />
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

      <SectionTitle title="Dette(s)" className="mt-12 mb-4" />
      <ul className="flex flex-col space-y-6">
        {debtFields.map((field: any, index: number) => (
          <div key={index} className="mt-2">
            <div className="flex flex-row items-center">
              <p className="font-main text-main underline">Dette {index + 1}</p>
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
  );
};

export default InventoryForm;
