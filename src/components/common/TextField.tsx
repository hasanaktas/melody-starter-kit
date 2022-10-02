import * as React from "react";

type Props = {
  name: string;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  helperText?: string;
};

const TextField = ({ name, onChange, label, value, helperText }: Props) => {
  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        onChange={onChange}
        value={value}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {helperText && (
        <label className="block mt-1 text-sm font-medium text-red-500">
          {helperText}
        </label>
      )}
    </div>
  );
};

export default TextField;
