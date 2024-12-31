import React from "react";
import { forwardRef } from "react";
import { MdError } from "react-icons/md";

interface InputFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  textarea?: boolean;
  error: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      label,
      type,
      value,
      onChange,
      placeholder,
      textarea,
      error,
    }: InputFieldProps,
    ref
  ) {
    return (
      <>
        <label className="text-textSecondary">
          {label}
          {textarea ? (
            <textarea
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`bg-transparent border ${
                error ? "outline-red-500" : "outline-tertiary"
              } text-textPrimary shadow w-full p-2 md:p-3 ${
                error && "border border-red-500"
              }`}
            />
          ) : (
            <input
              type={type}
              value={value}
              ref={ref}
              onChange={onChange}
              placeholder={placeholder}
              className={`bg-transparent border ${
                error ? "outline-red-500" : "outline-tertiary"
              } text-textPrimary shadow w-full p-2 md:p-3 ${
                error && "border border-red-500"
              }`}
            />
          )}
        </label>
        {error && (
          <div className="flex items-center text-red-500">
            <MdError />
            <span>&nbsp;{error}</span>
          </div>
        )}
      </>
    );
  }
);

export default InputField;
