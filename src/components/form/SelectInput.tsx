import React from 'react';
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
  return <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select id={id} value={value || ''} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <option value="">Select {label}</option>
        {options.map(option => <option key={option.value} value={option.value}>
            {option.label}
          </option>)}
      </select>
    </div>;
};
export default SelectInput;