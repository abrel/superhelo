import React from 'react';
import Select from 'react-select';
import { FieldError, Controller } from 'react-hook-form';

type SelectOption = {
  id: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
};

const MultiSelectInput: React.FC<{
  id: string;
  label: string;
  control: any;
  options: SelectOption[];
  values?: SelectOption[] | SelectOption;
  error?: FieldError;
  placeholder?: string;
  isMulti?: boolean;
}> = ({
  id,
  label,
  control,
  options,
  values,
  error,
  placeholder = 'Sélectionnez...',
  isMulti = true,
}) => {
  const errorComponent = error?.message && (
    <p className="italic font-main text-sm text-red-500 m-1">{error.message}</p>
  );

  return (
    <div className="inline-block relative w-full">
      {!!label && (
        <label className="block font-main text-main text-sm mb-2" htmlFor={id}>
          {label}
        </label>
      )}
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <Select
            styles={{
              control: (provided) => ({
                ...provided,
                color: '#28086e',
              }),
              option: (provided) => ({
                ...provided,
                color: '#28086e',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: '#28086e',
              }),
            }}
            options={options}
            value={values}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.label}
            placeholder={<p className="font-main text-main">{placeholder}</p>}
            isMulti={isMulti}
            isSearchable
            onChange={field.onChange}
          />
        )}
      />

      {errorComponent}
    </div>
  );
};

export default MultiSelectInput;
