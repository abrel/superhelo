import React from 'react';

const CheckboxInput: React.FC<{
  id: string;
  label: string;
  register: any;
}> = ({ id, label, register }) => {
  return (
    <div className="flex flex-row">
      <input
        className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top float-left mr-2 cursor-pointer"
        type="checkbox"
        {...register(id)}
        id={id}
      />
      <label
        className="inline-block font-main text-main text-base"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
