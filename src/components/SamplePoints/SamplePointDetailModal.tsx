import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import { SearchableSelect } from '../form/SearchableSelect';
import { fetchFacilities, fetchFacilityById } from '../../api/facilities';

interface SamplePointData {
  id: string;
  name: string;
  facilityId: string;
  wellVessel: string | null;
  location: string | null;
}

interface SamplePointDetailModalProps {
  samplePoint?: SamplePointData;
  onClose: () => void;
  onSave: (data: SamplePointData) => void;
  onDelete?: () => void;
}

const SamplePointDetailModal: React.FC<SamplePointDetailModalProps> = ({
  samplePoint,
  onClose,
  onSave,
  onDelete,
}) => {
  const [id, setId] = useState<string>(samplePoint?.id || '');
  const [name, setName] = useState<string>(samplePoint?.name || '');
  const [facilityId, setFacilityId] = useState<string>(samplePoint?.facilityId || '');
  const [wellVessel, setWellVessel] = useState<string>(samplePoint?.wellVessel || '');
  const [location, setLocation] = useState<string>(samplePoint?.location || '');

  // Dropdown states for facilities
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<{ id: string; label: string } | undefined>(undefined);
  const [dropdownOptions, setDropdownOptions] = useState<{ id: string; label: string }[]>([]);

  // Keep selectedFacility in sync with facilityId
  useEffect(() => {
    let isMounted = true;
    async function syncSelectedFacility() {
      if (!facilityId) {
        if (isMounted) setSelectedFacility(undefined);
        return;
      }
      setDropdownLoading(true);
      try {
        const fac = await fetchFacilityById(facilityId);
        if (fac && isMounted) {
          const option = { id: fac.id, label: fac.name };
          setSelectedFacility(option);
          setDropdownOptions((opts) => {
            if (!opts.find(o => o.id === option.id)) {
              return [option, ...opts];
            }
            return opts;
          });
        }
      } catch {
        if (isMounted) setSelectedFacility(undefined);
      } finally {
        if (isMounted) setDropdownLoading(false);
      }
    }
    syncSelectedFacility();
    return () => { isMounted = false; };
  }, [facilityId]);

  const handleFacilitySearch = async (query: string) => {
    setDropdownLoading(true);
    try {
      const res = await fetchFacilities(1, 5, query, 'name', 'asc');
      let opts = res.data.map(f => ({ id: f.id, label: f.name }));
      if (selectedFacility && !opts.find(o => o.id === selectedFacility.id)) {
        opts = [selectedFacility, ...opts];
      }
      setDropdownOptions(opts);
      return opts;
    } finally {
      setDropdownLoading(false);
    }
  };

  useEffect(() => {
    handleFacilitySearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setId(samplePoint?.id || '');
    setName(samplePoint?.name || '');
    setFacilityId(samplePoint?.facilityId || '');
    setWellVessel(samplePoint?.wellVessel || '');
    setLocation(samplePoint?.location || '');
  }, [samplePoint]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !facilityId) return;
    const data: SamplePointData = {
      id: id || crypto.randomUUID(),
      name: name.trim(),
      facilityId,
      wellVessel: wellVessel.trim() || null,
      location: location.trim() || null,
    };
    onSave(data);
  };

  // Ensure selectedFacility is always in dropdownOptions
  useEffect(() => {
    if (
      selectedFacility &&
      !dropdownOptions.find((o) => o.id === selectedFacility.id)
    ) {
      setDropdownOptions((opts) => [selectedFacility, ...opts]);
    }
    // Only run when selectedFacility changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFacility]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {samplePoint ? 'Edit Sample Point' : 'New Sample Point'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Facility Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Facility</label>
            <SearchableSelect
              value={selectedFacility}
              onSelect={opt => setFacilityId(opt.id)}
              onSearch={handleFacilitySearch}
              options={dropdownOptions}
              loading={dropdownLoading}
              placeholder="Select facility"
            />
          </div>

          {/* Well/Vessel */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Well/Vessel</label>
            <input
              type="text"
              value={wellVessel || ''}
              onChange={e => setWellVessel(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={location || ''}
              onChange={e => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SamplePointDetailModal;
