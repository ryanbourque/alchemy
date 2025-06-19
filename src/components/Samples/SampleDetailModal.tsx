import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import { SearchableSelect } from '../form/SearchableSelect';
import { fetchFacilities, fetchFacilityById } from '../../api/facilities';
import { fetchSamplePoints, fetchSamplePointById } from '../../api/samplepoints';
import { fetchContacts, fetchContactById } from '../../api/contacts';
import { fetchAccounts, fetchAccountById } from '../../api/accounts';

interface SampleData {
  id: string;
  sampleId: string;
  facilityId: string;
  samplePointId: string;
  ownerId: string;
  facilitatorId: string | null;
  collectionDate: string | null;      // ISO string
  collectedById: string | null;
  dateReceivedByLab: string | null;   // ISO string
  completionDate: string | null;      // ISO string
}

interface SampleDetailModalProps {
  sample?: SampleData;
  onClose: () => void;
  onSave: (data: SampleData) => void;
  onDelete?: () => void;
}

const SampleDetailModal: React.FC<SampleDetailModalProps> = ({
  sample,
  onClose,
  onSave,
  onDelete,
}) => {
  const [id, setId] = useState<string>(sample?.id || '');
  const [sampleId, setSampleId] = useState<string>(sample?.sampleId || '');
  const [facilityId, setFacilityId] = useState<string>(sample?.facilityId || '');
  const [samplePointId, setSamplePointId] = useState<string>(sample?.samplePointId || '');
  const [ownerId, setOwnerId] = useState<string>(sample?.ownerId || '');
  const [facilitatorId, setFacilitatorId] = useState<string>(sample?.facilitatorId || '');
  const [collectionDate, setCollectionDate] = useState<string>(sample?.collectionDate || '');
  const [collectedById, setCollectedById] = useState<string>(sample?.collectedById || '');
  const [dateReceivedByLab, setDateReceivedByLab] = useState<string>(sample?.dateReceivedByLab || '');
  const [completionDate, setCompletionDate] = useState<string>(sample?.completionDate || '');

  // Facility dropdown state
  const [selectedFacility, setSelectedFacility] = useState<{ id: string; label: string } | undefined>(undefined);
  const [facilityOptions, setFacilityOptions] = useState<{ id: string; label: string }[]>([]);

  // Sample Point dropdown state
  const [selectedSamplePoint, setSelectedSamplePoint] = useState<{ id: string; label: string } | undefined>(undefined);
  const [samplePointOptions, setSamplePointOptions] = useState<{ id: string; label: string }[]>([]);

  // Owner dropdown state
  const [selectedOwner, setSelectedOwner] = useState<{ id: string; label: string } | undefined>(undefined);
  const [ownerOptions, setOwnerOptions] = useState<{ id: string; label: string }[]>([]);

  // Facilitator dropdown state
  const [selectedFacilitator, setSelectedFacilitator] = useState<{ id: string; label: string } | undefined>(undefined);
  const [facilitatorOptions, setFacilitatorOptions] = useState<{ id: string; label: string }[]>([]);

  // Collected By dropdown state
  const [selectedCollectedBy, setSelectedCollectedBy] = useState<{ id: string; label: string } | undefined>(undefined);
  const [collectedByOptions, setCollectedByOptions] = useState<{ id: string; label: string }[]>([]);

  // Sync selectedFacility with facilityId
  useEffect(() => {
    let isMounted = true;
    async function syncSelectedFacility() {
      if (!facilityId) {
        if (isMounted) setSelectedFacility(undefined);
        return;
      }
      try {
        const fac = await fetchFacilityById(facilityId);
        if (fac && isMounted) {
          const option = { id: fac.id, label: fac.name };
          setSelectedFacility(option);
          setFacilityOptions((opts) => {
            if (!opts.find(o => o.id === option.id)) {
              return [option, ...opts];
            }
            return opts;
          });
        }
      } catch {
        if (isMounted) setSelectedFacility(undefined);
      }
    }
    syncSelectedFacility();
    return () => { isMounted = false; };
  }, [facilityId]);

  // Sync selectedSamplePoint with samplePointId
  useEffect(() => {
    let isMounted = true;
    async function syncSelectedSamplePoint() {
      if (!samplePointId) {
        if (isMounted) setSelectedSamplePoint(undefined);
        return;
      }
      try {
        const sp = await fetchSamplePointById(samplePointId);
        if (sp && isMounted) {
          const option = { id: sp.id, label: sp.name };
          setSelectedSamplePoint(option);
          setSamplePointOptions((opts) => {
            if (!opts.find(o => o.id === option.id)) {
              return [option, ...opts];
            }
            return opts;
          });
        }
      } catch {
        if (isMounted) setSelectedSamplePoint(undefined);
      }
    }
    syncSelectedSamplePoint();
    return () => { isMounted = false; };
  }, [samplePointId]);

  // Sync selectedOwner with ownerId (use Account API)
  useEffect(() => {
    let isMounted = true;
    async function syncSelectedOwner() {
      if (!ownerId) {
        if (isMounted) setSelectedOwner(undefined);
        return;
      }
      try {
        const account = await fetchAccountById(ownerId);
        if (account && isMounted) {
          const option = { id: account.id, label: account.name };
          setSelectedOwner(option);
          setOwnerOptions((opts) => {
            if (!opts.find(o => o.id === option.id)) {
              return [option, ...opts];
            }
            return opts;
          });
        }
      } catch {
        if (isMounted) setSelectedOwner(undefined);
      }
    }
    syncSelectedOwner();
    return () => { isMounted = false; };
  }, [ownerId]);

  // Sync selectedFacilitator with facilitatorId (use Account API)
  useEffect(() => {
    let isMounted = true;
    async function syncSelectedFacilitator() {
      if (!facilitatorId) {
        if (isMounted) setSelectedFacilitator(undefined);
        return;
      }
      try {
        const account = await fetchAccountById(facilitatorId);
        if (account && isMounted) {
          const option = { id: account.id, label: account.name };
          setSelectedFacilitator(option);
          setFacilitatorOptions((opts) => {
            if (!opts.find(o => o.id === option.id)) {
              return [option, ...opts];
            }
            return opts;
          });
        }
      } catch {
        if (isMounted) setSelectedFacilitator(undefined);
      }
    }
    syncSelectedFacilitator();
    return () => { isMounted = false; };
  }, [facilitatorId]);

  // Sync selectedCollectedBy with collectedById
  useEffect(() => {
    let isMounted = true;
    async function syncSelectedCollectedBy() {
      if (!collectedById) {
        if (isMounted) setSelectedCollectedBy(undefined);
        return;
      }
      try {
        const contact = await fetchContactById(collectedById);
        if (contact && isMounted) {
          const option = { id: contact.id, label: contact.name };
          setSelectedCollectedBy(option);
          setCollectedByOptions((opts) => {
            if (!opts.find(o => o.id === option.id)) {
              return [option, ...opts];
            }
            return opts;
          });
        }
      } catch {
        if (isMounted) setSelectedCollectedBy(undefined);
      }
    }
    syncSelectedCollectedBy();
    return () => { isMounted = false; };
  }, [collectedById]);

  // Search handlers
  const handleFacilitySearch = async (query: string) => {
    try {
      const res = await fetchFacilities(1, 5, query, 'name', 'asc');
      let opts = res.data.map(f => ({ id: f.id, label: f.name }));
      if (selectedFacility && !opts.find(o => o.id === selectedFacility.id)) {
        opts = [selectedFacility, ...opts];
      }
      setFacilityOptions(opts);
      return opts;
    } catch {
      // ignore error
      return [];
    }
  };
  const handleSamplePointSearch = async (query: string) => {
    try {
      const res = await fetchSamplePoints(1, 5, query, 'name', 'asc');
      let opts = res.data.map(sp => ({ id: sp.id, label: sp.name }));
      if (selectedSamplePoint && !opts.find(o => o.id === selectedSamplePoint.id)) {
        opts = [selectedSamplePoint, ...opts];
      }
      setSamplePointOptions(opts);
      return opts;
    } catch {
      // ignore error
      return [];
    }
  };
  const handleOwnerSearch = async (query: string) => {
    try {
      const res = await fetchAccounts(1, 5, query, 'name', 'asc');
      let opts = res.data.map(a => ({ id: a.id, label: a.name }));
      if (selectedOwner && !opts.find(o => o.id === selectedOwner.id)) {
        opts = [selectedOwner, ...opts];
      }
      setOwnerOptions(opts);
      return opts;
    } catch {
      // ignore error
      return [];
    }
  };
  const handleFacilitatorSearch = async (query: string) => {
    try {
      const res = await fetchAccounts(1, 5, query, 'name', 'asc');
      let opts = res.data.map(a => ({ id: a.id, label: a.name }));
      if (selectedFacilitator && !opts.find(o => o.id === selectedFacilitator.id)) {
        opts = [selectedFacilitator, ...opts];
      }
      setFacilitatorOptions(opts);
      return opts;
    } catch {
      // ignore error
      return [];
    }
  };
  const handleCollectedBySearch = async (query: string) => {
    try {
      const res = await fetchContacts(1, 5, query, 'name', 'asc');
      let opts = res.data.map(c => ({ id: c.id, label: c.name }));
      if (selectedCollectedBy && !opts.find(o => o.id === selectedCollectedBy.id)) {
        opts = [selectedCollectedBy, ...opts];
      }
      setCollectedByOptions(opts);
      return opts;
    } catch {
      // ignore error
      return [];
    }
  };

  // On mount, load initial options for all dropdowns
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleFacilitySearch(''); }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleSamplePointSearch(''); }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleOwnerSearch(''); }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleFacilitatorSearch(''); }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleCollectedBySearch(''); }, []);

  useEffect(() => {
    setId(sample?.id || '');
    setSampleId(sample?.sampleId || '');
    setFacilityId(sample?.facilityId || '');
    setSamplePointId(sample?.samplePointId || '');
    setOwnerId(sample?.ownerId || '');
    setFacilitatorId(sample?.facilitatorId || '');
    setCollectionDate(sample?.collectionDate || '');
    setCollectedById(sample?.collectedById || '');
    setDateReceivedByLab(sample?.dateReceivedByLab || '');
    setCompletionDate(sample?.completionDate || '');
  }, [sample]);

  // When sample changes, clear selected options if the new sample has no value for those fields
  useEffect(() => {
    if (!sample?.ownerId) setSelectedOwner(undefined);
    if (!sample?.facilitatorId) setSelectedFacilitator(undefined);
    if (!sample?.collectedById) setSelectedCollectedBy(undefined);
  }, [sample]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampleId.trim() || !facilityId || !samplePointId || !ownerId) return;
    const data: SampleData = {
      id: id || crypto.randomUUID(),
      sampleId: sampleId.trim(),
      facilityId,
      samplePointId,
      ownerId,
      facilitatorId: facilitatorId || null,
      collectionDate: collectionDate || null,
      collectedById: collectedById || null,
      dateReceivedByLab: dateReceivedByLab || null,
      completionDate: completionDate || null,
    };
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {sample ? 'Edit Sample' : 'New Sample'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Sample ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sample ID</label>
            <input
              type="text"
              value={sampleId}
              onChange={e => setSampleId(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Facility */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Facility</label>
            <SearchableSelect
              value={selectedFacility}
              onSelect={opt => setFacilityId(opt.id)}
              onSearch={handleFacilitySearch}
              options={facilityOptions}
              loading={false}
              placeholder="Select facility"
            />
          </div>

          {/* Sample Point */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sample Point</label>
            <SearchableSelect
              value={selectedSamplePoint}
              onSelect={opt => setSamplePointId(opt.id)}
              onSearch={handleSamplePointSearch}
              options={samplePointOptions}
              loading={false}
              placeholder="Select sample point"
            />
          </div>

          {/* Owner */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
            <SearchableSelect
              value={selectedOwner}
              onSelect={opt => setOwnerId(opt.id)}
              onSearch={handleOwnerSearch}
              options={ownerOptions}
              loading={false}
              placeholder="Select owner"
            />
          </div>

          {/* Facilitator */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Facilitator</label>
            <SearchableSelect
              value={selectedFacilitator}
              onSelect={opt => setFacilitatorId(opt.id)}
              onSearch={handleFacilitatorSearch}
              options={facilitatorOptions}
              loading={false}
              placeholder="Select facilitator"
            />
          </div>

          {/* Collection Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Collection Date</label>
            <input
              type="date"
              value={collectionDate ? collectionDate.slice(0, 10) : ''}
              onChange={e => setCollectionDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Collected By */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Collected By</label>
            <SearchableSelect
              value={selectedCollectedBy}
              onSelect={opt => setCollectedById(opt.id)}
              onSearch={handleCollectedBySearch}
              options={collectedByOptions}
              loading={false}
              placeholder="Select collector"
            />
          </div>

          {/* Date Received By Lab */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Received By Lab</label>
            <input
              type="date"
              value={dateReceivedByLab ? dateReceivedByLab.slice(0, 10) : ''}
              onChange={e => setDateReceivedByLab(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Completion Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
            <input
              type="date"
              value={completionDate ? completionDate.slice(0, 10) : ''}
              onChange={e => setCompletionDate(e.target.value)}
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

export default SampleDetailModal;
