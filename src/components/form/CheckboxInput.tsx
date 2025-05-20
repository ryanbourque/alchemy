import React from 'react';
interface CheckboxInputProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
const CheckboxInput: React.FC<CheckboxInputProps> = ({
  id,
  label,
  checked,
  onChange
}) => {
  return <div className="mb-4 flex items-center">
      <input type="checkbox" id={id} checked={checked || false} onChange={e => onChange(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>;
};
export default CheckboxInput;