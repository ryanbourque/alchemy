import React from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import DateTimeInput from './DateTimeInput';
import CheckboxInput from './CheckboxInput';
import SelectInput from './SelectInput';
import { getRelatedObjectOptions } from '../../utils/dataUtils';
interface FormFieldProps {
  field: {
    id: string;
    label: string;
    type: string;
  };
  value: any;
  onChange: (id: string, value: any) => void;
  relatedObjectType?: string;
}
const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
  relatedObjectType
}) => {
  const handleChange = (newValue: any) => {
    onChange(field.id, newValue);
  };
  // Handle foreign key fields
  if (field.type === 'foreignKey') {
    const relatedType = field.id.replace('Id', 's');
    const options = getRelatedObjectOptions(relatedType);
    return <SelectInput id={field.id} label={field.label} value={value} options={options} onChange={handleChange} />;
  }
  switch (field.type) {
    case 'integer':
    case 'decimal':
      return <NumberInput id={field.id} label={field.label} value={value} onChange={handleChange} step={field.type === 'integer' ? 1 : 0.01} />;
    case 'date':
      return <DateTimeInput id={field.id} label={field.label} value={value} onChange={handleChange} />;
    case 'checkbox':
      return <CheckboxInput id={field.id} label={field.label} checked={value} onChange={handleChange} />;
    default:
      return <TextInput id={field.id} label={field.label} value={value || ''} onChange={handleChange} />;
  }
};
export default FormField;