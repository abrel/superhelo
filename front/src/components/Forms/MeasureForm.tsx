import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';
import { selectInputMeasureTypes } from '@@/constants/measure';
import StandardInput from '@@/components/Inputs/StandardInput';
import MultiSelectInput from '@@/components/Inputs/MultiSelectInput';
import DatePickerInput from '@@/components/Inputs/DatePickerInput';

const MeasureForm: React.FC<{ form: any }> = ({ form }) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  const [measures] = watch(['measures']);

  const {
    fields: measureFields,
    append: appendMeasure,
    remove: removeMeasure,
  } = useFieldArray({
    control,
    name: 'measures',
  });
  return (
    <form className="flex flex-col mt-6 w-fit">
      {!measures?.length && (
        <p className="font-main text-main flex flex-row items-center">
          <IoWarningOutline size={24} />
          <span className="mx-1">Aucune mesure ajoutée</span>
          <IoWarningOutline size={24} />
        </p>
      )}
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
    </form>
  );
};

export default MeasureForm;
