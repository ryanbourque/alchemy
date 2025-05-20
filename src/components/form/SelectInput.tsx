import React from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
interface SelectOption {
  value: string;
  label: string;
}
interface SelectInputProps {
  id: string;
  label: string;
  value: string | null;
  options: SelectOption[];
  onChange: (value: string) => void;
}
const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  value,
  options,
  onChange
}) => {
  const customStyles: StylesConfig<SelectOption, false> = {
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    menu: base => ({ ...base, zIndex: 9999 })
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Select<SelectOption, false>
        inputId={id}
        placeholder={`Select ${label}`}
        options={options}
        value={options.find(o => o.value === value) || null}
        onChange={(opt: SingleValue<SelectOption>) => onChange(opt?.value || '')}
        className="w-full"
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        menuPosition="fixed"
        styles={customStyles}
      />
    </div>
  );
};
export default SelectInput;