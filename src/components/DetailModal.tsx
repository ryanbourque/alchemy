import React, { useEffect, useState } from 'react';
import FormField from './form/FormField';
import { getObjectFields } from '../utils/dataUtils';
import { XIcon } from 'lucide-react';
interface DetailModalProps {
  objectTypeId: string;
  objectData: any;
  onClose: () => void;
  onSave: (updatedData: any) => void;
}
const DetailModal: React.FC<DetailModalProps> = ({
  objectTypeId,
  objectData,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<any>({});
  const fields = getObjectFields(objectTypeId);
  useEffect(() => {
    setFormData({
      ...objectData
    });
  }, [objectData]);
  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldId]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Record</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(field => <FormField key={field.id} field={field} value={formData[field.id]} onChange={handleChange} relatedObjectType={field.id.endsWith('Id') ? field.id.replace('Id', 's') : undefined} />)}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
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