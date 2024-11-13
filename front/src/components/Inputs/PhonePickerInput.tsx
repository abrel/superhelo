import React from 'react';
import { FieldError, Controller } from 'react-hook-form';
import PI, { PhoneInputProps } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ReactPhoneInput: React.FC<PhoneInputProps> = (PI as any).default || PI;

const PhonePickerInput: React.FC<{
  control: any;
  id: string;
  error?: FieldError;
  label?: string;
}> = ({ control, id, error, label }) => {
  const errorComponent = error?.message && (
    <p className="italic font-main text-sm text-red-500 m-1">{error.message}</p>
  );

  return (
    <div className="relative">
      {!!label && <p className="-mt-7 mb-1 font-main text-main">{label}</p>}
      <Controller
        control={control}
        name={id}
        rules={{ required: true }}
        render={({ field }: { field: any }) => (
          <ReactPhoneInput
            {...field}
            country={'fr'}
            countryCodeEditable={false}
            inputStyle={{
              width: '100%',
              height: '45px',
              borderRadius: '8px',
              borderColor: '#E5E7EB',
            }}
            buttonStyle={{
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
              borderColor: '#E5E7EB',
            }}
          />
        )}
      />
      {errorComponent}
    </div>
  );
};

export default PhonePickerInput;
