import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';
import StandardInput from '@@/components/Inputs/StandardInput';

const PasswordForm: React.FC<{ form: any }> = ({ form }) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const {
    fields: passwordFields,
    append: appendPassword,
    remove: removePassword,
  } = useFieldArray({
    control,
    name: 'passwords',
  });
  return (
    <form className="flex flex-col mt-6 w-fit">
      {!passwordFields?.length && (
        <p className="font-main text-main flex flex-row items-center">
          <IoWarningOutline size={24} />
          <span className="mx-1">Aucun mot de passe ajouté</span>
          <IoWarningOutline size={24} />
        </p>
      )}
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
    </form>
  );
};

export default PasswordForm;
