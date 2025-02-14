import React, { useState, useCallback, useMemo } from 'react';
import { FieldError } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const StandardInput: React.FC<{
  register: any;
  id: string;
  label: string;
  type: string;
  rows?: number;
  placeholder?: string;
  error?: FieldError;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  handleKeyDown?: (e: React.KeyboardEvent) => void;
}> = ({
  register,
  id,
  label,
  type,
  rows,
  placeholder,
  error,
  inputClassName = 'peer block w-full ring-1 ring-gray-200 shadow-sm py-3 px-4 border-main rounded-md placeholder-transparent font-main text-main text-sm',
  labelClassName = 'absolute pointer-events-none font-main text-main text-sm -top-7 left-0 transition-all peer-focus:-top-6 peer-focus:left-0 peer-focus:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:left-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:italic',
  errorClassName = 'italic font-main text-sm text-red-500 m-1',
  handleKeyDown,
}) => {
  const errorComponent = useMemo(
    () => error?.message && <p className={errorClassName}>{error.message}</p>,
    [error?.message],
  );

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, [setShowPassword]);

  if (type === 'textarea') {
    return (
      <div className="relative w-full">
        <textarea
          {...register(id)}
          id={id}
          rows={rows || 7}
          placeholder={placeholder}
          className={inputClassName}
          aria-invalid={error ? 'true' : 'false'}
          onKeyDown={(e) => !!handleKeyDown && handleKeyDown(e)}
        />
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
        {errorComponent}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <input
        {...register(id)}
        id={id}
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        className={inputClassName}
        aria-invalid={error ? 'true' : 'false'}
      />

      {type === 'password' && (
        <button
          type="button"
          className="absolute right-3 top-3"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}

      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      {errorComponent}
    </div>
  );
};

export default StandardInput;
