import React, { useEffect, useState } from 'react';
import FormField from './form/FormField';
import { formConfig, FormConfigItem, FieldConfig } from '../data/formConfig';
import { XIcon } from 'lucide-react';

interface DetailModalProps {
  objectTypeId: string;
  objectData: Record<string, unknown>;
  onClose: () => void;
  onSave: (updatedData: Record<string, unknown>) => void;
  onDelete?: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({
  objectTypeId,
  objectData,
  onClose,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  // Determine form layout from config
  const configItem: FormConfigItem | undefined = formConfig[objectTypeId];
  const formGroups: { groupLabel: string; fields: FieldConfig[] }[] = configItem
    ? configItem.formLayout
    : [{ groupLabel: '', fields: [] }];

  useEffect(() => {
    setFormData({
      ...objectData as Record<string, unknown>
    });
  }, [objectData]);

  const handleChange = (fieldId: string, value: unknown) => {
    setFormData((prev: Record<string, unknown>) => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-visible">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Record</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4 max-h-[calc(90vh-120px)] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            {/* render form groups */}
            {formGroups.map(group => (
              <div key={group.groupLabel} className="mb-6">
                {group.groupLabel && <h3 className="text-lg font-medium text-gray-700 mb-2">{group.groupLabel}</h3>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.fields.map(field => (
                    <FormField
                      key={field.name}
                      field={field}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-6 flex justify-end space-x-3">
              {onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              )}
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};

export default DetailModal;