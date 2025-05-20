import React from 'react';
interface NumberInputProps {
  id: string;
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  step?: number;
  min?: number;
  max?: number;
}
const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  value,
  onChange,
  step = 1,
  min,
  max
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val === '' ? null : parseFloat(val));
  };
  return <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input type="number" id={id} value={value === null ? '' : value} onChange={handleChange} step={step} min={min} max={max} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
    </div>;
};
export default NumberInput;