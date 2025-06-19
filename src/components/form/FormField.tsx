import React from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import DateTimeInput from './DateTimeInput';
import CheckboxInput from './CheckboxInput';
import { SearchableSelect, Option } from '../form/SearchableSelect';
import { getRelatedObjectOptions } from '../../utils/dataUtils';
import { FieldConfig } from '../../data/formConfig';
interface FormFieldProps {
  field: FieldConfig;
  value: unknown;
  onChange: (id: string, value: unknown) => void;
}
const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange
}) => {
  const handleChange = (newValue: unknown) => {
    onChange(field.name, newValue);
  };
  // Handle foreign key fields
  if (field.type === 'foreignKey') {
    const relatedType = field.optionsKey || field.name.replace('Id', 's');
    const options = getRelatedObjectOptions(relatedType);
    // map to SearchableSelect Option type
    const items: Option[] = options.map(o => ({ id: o.value, label: o.label }));
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
        <SearchableSelect
          value={items.find(i => i.id === value)}
          options={items}
          onSelect={(opt: Option) => handleChange(opt.id)}
          onSearch={async (query: string) => items.filter(opt => opt.label.toLowerCase().includes(query.toLowerCase()))}
          placeholder={`Select ${field.label}`}
        />
      </div>
    );
  }
  switch (field.type) {
    case 'integer':
    case 'decimal':
      return <NumberInput id={field.name} label={field.label} value={(value as number) ?? 0} onChange={handleChange} step={field.type === 'integer' ? 1 : 0.01} />;
    case 'date':
      return <DateTimeInput id={field.name} label={field.label} value={(value as string) ?? ''} onChange={handleChange} />;
    case 'checkbox':
      return <CheckboxInput id={field.name} label={field.label} checked={Boolean(value)} onChange={handleChange} />;
    default:
      return <TextInput id={field.name} label={field.label} value={(value as string) || ''} onChange={handleChange} />;
  }
};
export default FormField;