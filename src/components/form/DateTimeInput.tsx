import React from 'react';
interface DateTimeInputProps {
  id: string;
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
}
const DateTimeInput: React.FC<DateTimeInputProps> = ({
  id,
  label,
  value,
  onChange
}) => {
  // Convert ISO string to date format
  const formatForDate = (isoString: string | null) => {
    if (!isoString) return '';
    return isoString.substring(0, 10); // Format: YYYY-MM-DD
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val ? `${val}T00:00:00.000Z` : null);
  };
  return <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input type="date" id={id} value={formatForDate(value)} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
    </div>;
};
export default DateTimeInput;