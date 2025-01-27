import React, { useMemo } from 'react';
import { FieldError, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from 'date-fns/locale';

const DatePickerInput: React.FC<{
  control: any;
  id: string;
  label: string;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  error?: FieldError;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  inputClassName?: string;
  labelClassName?: string;
}> = ({
  control,
  id,
  label,
  showTimeSelect,
  showTimeSelectOnly,
  error,
  placeholder = 'jj/mm/aaaa',
  minDate,
  maxDate,
  inputClassName = 'peer block w-full ring-1 ring-gray-200 shadow-sm py-3 px-4 border-main rounded-md font-main text-main text-sm',
  labelClassName = 'absolute pointer-events-none font-main text-main text-sm -top-7 left-0 transition-all peer-focus:-top-6 peer-focus:left-0 peer-focus:text-sm',
}) => {
  const errorComponent = useMemo(
    () =>
      error?.message && (
        <p className="flex italic font-main text-sm text-red-500 m-1">
          {error.message}
        </p>
      ),
    [error?.message],
  );

  const dateFormat = useMemo(() => {
    if (showTimeSelectOnly) {
      return 'HH:mm';
    }

    return showTimeSelect ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy';
  }, [showTimeSelect, showTimeSelectOnly]);

  return (
    <div className="relative w-full">
      <Controller
        control={control}
        name={id}
        render={({ field }) => {
          const value =
            typeof field.value === 'string'
              ? moment(field.value).toDate()
              : field.value;

          return (
            <DatePicker
              showTimeSelect={!!showTimeSelect}
              showTimeSelectOnly={!!showTimeSelectOnly}
              className={inputClassName}
              placeholderText={placeholder}
              onChange={(date) => {
                field.onChange(date);
              }}
              selected={value}
              locale={fr}
              dateFormat={dateFormat}
              timeFormat="HH:mm"
              timeIntervals={15}
              isClearable
              showYearDropdown
              yearDropdownItemNumber={100}
              scrollableYearDropdown
              minDate={minDate}
              maxDate={maxDate}
            />
          );
        }}
      />
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      {errorComponent}
    </div>
  );
};

export default DatePickerInput;
