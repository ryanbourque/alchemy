// components/WaterAnalysisDetailModal.tsx
import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import { fetchSamples } from '../../api/samples';
import { SearchableSelect } from '../form/SearchableSelect';

/**
 * WaterAnalysisData - shape of a water analysis record.
 * TODO: For new test types, copy this file and update the fields as needed.
 */
interface WaterAnalysisData {
  id: string;
  sampleFk: string;
  sampleName: string;
  dateAnalyzed: string | null;
  bwpd: number | null;
  mcfd: number | null;
  ph: number | null;
  dissolvedCO2: number | null;
  dissolvedH2S: number | null;
  gasCO2: number | null;
  gasH2S: number | null;
  totalDissolvedSolids: number | null;
  chlorides: number | null;
  bicarbonates: number | null;
  ironTotal: number | null;
  manganese: number | null;
  barium: number | null;
  calcium: number | null;
  potassium: number | null;
  lithium: number | null;
  magnesium: number | null;
  sodium: number | null;
  phosphates: number | null;
  strontium: number | null;
  zinc: number | null;
  sulfates: number | null;
  specificGravity: number | null;
}

/**
 * Props for WaterAnalysisDetailModal.
 * TODO: For new test types, update prop types as needed.
 */
interface WaterAnalysisDetailModalProps {
  waterAnalysis?: WaterAnalysisData;
  onClose: () => void;
  onSave: (data: WaterAnalysisData) => void;
  onDelete?: () => void;
}

/**
 * WaterAnalysisDetailModal - Modal for viewing/editing a Water Analysis record.
 *
 * TODO: For new test types, copy this file and update:
 *   - WaterAnalysisData fields
 *   - Form fields and state
 *   - API calls (fetchSamples, etc.)
 */
const WaterAnalysisDetailModal: React.FC<WaterAnalysisDetailModalProps> = ({
  waterAnalysis,
  onClose,
  onSave,
  onDelete,
}) => {
  // --- State: Form Fields ---
  const [id, setId] = useState<string>(waterAnalysis?.id || '');
  const [sampleFk, setSampleFk] = useState<string>(waterAnalysis?.sampleFk || '');
  const [sampleName, setSampleName] = useState<string>(waterAnalysis?.sampleName || '');
  const [dateAnalyzed, setDateAnalyzed] = useState<string>(waterAnalysis?.dateAnalyzed || '');
  const [bwpd, setBwpd] = useState<number | ''>(waterAnalysis?.bwpd ?? '');
  const [mcfd, setMcfd] = useState<number | ''>(waterAnalysis?.mcfd ?? '');
  const [ph, setPh] = useState<number | ''>(waterAnalysis?.ph ?? '');
  const [dissolvedCO2, setDissolvedCO2] = useState<number | ''>(waterAnalysis?.dissolvedCO2 ?? '');
  const [dissolvedH2S, setDissolvedH2S] = useState<number | ''>(waterAnalysis?.dissolvedH2S ?? '');
  const [gasCO2, setGasCO2] = useState<number | ''>(waterAnalysis?.gasCO2 ?? '');
  const [gasH2S, setGasH2S] = useState<number | ''>(waterAnalysis?.gasH2S ?? '');
  const [totalDissolvedSolids, setTotalDissolvedSolids] = useState<number | ''>(
    waterAnalysis?.totalDissolvedSolids ?? ''
  );
  const [chlorides, setChlorides] = useState<number | ''>(waterAnalysis?.chlorides ?? '');
  const [bicarbonates, setBicarbonates] = useState<number | ''>(waterAnalysis?.bicarbonates ?? '');
  const [ironTotal, setIronTotal] = useState<number | ''>(waterAnalysis?.ironTotal ?? '');
  const [manganese, setManganese] = useState<number | ''>(waterAnalysis?.manganese ?? '');
  const [barium, setBarium] = useState<number | ''>(waterAnalysis?.barium ?? '');
  const [calcium, setCalcium] = useState<number | ''>(waterAnalysis?.calcium ?? '');
  const [potassium, setPotassium] = useState<number | ''>(waterAnalysis?.potassium ?? '');
  const [lithium, setLithium] = useState<number | ''>(waterAnalysis?.lithium ?? '');
  const [magnesium, setMagnesium] = useState<number | ''>(waterAnalysis?.magnesium ?? '');
  const [sodium, setSodium] = useState<number | ''>(waterAnalysis?.sodium ?? '');
  const [phosphates, setPhosphates] = useState<number | ''>(waterAnalysis?.phosphates ?? '');
  const [strontium, setStrontium] = useState<number | ''>(waterAnalysis?.strontium ?? '');
  const [zinc, setZinc] = useState<number | ''>(waterAnalysis?.zinc ?? '');
  const [sulfates, setSulfates] = useState<number | ''>(waterAnalysis?.sulfates ?? '');
  const [specificGravity, setSpecificGravity] = useState<number | ''>(
    waterAnalysis?.specificGravity ?? ''
  );

  // --- State: Sample Selection ---
  const [selectedSample, setSelectedSample] = useState<{ id: string; label: string } | undefined>(undefined);
  const [sampleOptions, setSampleOptions] = useState<{ id: string; label: string }[]>([]);
  const [sampleLoading, setSampleLoading] = useState(false);

  // --- Effects: Sync selectedSample with sampleFk ---
  useEffect(() => {
    let isMounted = true;
    async function syncSelectedSample() {
      if (!sampleFk) {
        if (isMounted) setSelectedSample(undefined);
        return;
      }
      setSampleLoading(true);
      try {
        const res = await fetchSamples(1, 1, '', 'sampleId', 'asc');
        const found = res.data.find(s => s.id === sampleFk);
        if (found && isMounted) {
          const option = { id: found.id, label: found.sampleId };
          setSelectedSample(option);
          setSampleOptions(opts => {
            if (!opts.find(o => o.id === option.id)) {
              return [option, ...opts];
            }
            return opts;
          });
        }
      } catch {
        if (isMounted) setSelectedSample(undefined);
      } finally {
        if (isMounted) setSampleLoading(false);
      }
    }
    syncSelectedSample();
    return () => { isMounted = false; };
  }, [sampleFk]);

  // --- Handlers: Sample Search ---
  const handleSampleSearch = React.useCallback(async (query: string) => {
    setSampleLoading(true);
    try {
      const res = await fetchSamples(1, 5, query, 'sampleId', 'asc');
      let opts = res.data.map(s => ({ id: s.id, label: s.sampleId }));
      if (selectedSample && !opts.find(o => o.id === selectedSample.id)) {
        opts = [selectedSample, ...opts];
      }
      setSampleOptions(opts);
      return opts;
    } catch {
      return [];
    } finally {
      setSampleLoading(false);
    }
  }, [selectedSample]);

  // --- Effects: Initial Sample Options ---
  useEffect(() => { handleSampleSearch(''); }, [handleSampleSearch]);

  // --- Effects: Sync form state with waterAnalysis prop ---
  useEffect(() => {
    setId(waterAnalysis?.id || '');
    setSampleFk(waterAnalysis?.sampleFk || '');
    setSampleName(waterAnalysis?.sampleName || '');
    setDateAnalyzed(waterAnalysis?.dateAnalyzed || '');
    setBwpd(waterAnalysis?.bwpd ?? '');
    setMcfd(waterAnalysis?.mcfd ?? '');
    setPh(waterAnalysis?.ph ?? '');
    setDissolvedCO2(waterAnalysis?.dissolvedCO2 ?? '');
    setDissolvedH2S(waterAnalysis?.dissolvedH2S ?? '');
    setGasCO2(waterAnalysis?.gasCO2 ?? '');
    setGasH2S(waterAnalysis?.gasH2S ?? '');
    setTotalDissolvedSolids(waterAnalysis?.totalDissolvedSolids ?? '');
    setChlorides(waterAnalysis?.chlorides ?? '');
    setBicarbonates(waterAnalysis?.bicarbonates ?? '');
    setIronTotal(waterAnalysis?.ironTotal ?? '');
    setManganese(waterAnalysis?.manganese ?? '');
    setBarium(waterAnalysis?.barium ?? '');
    setCalcium(waterAnalysis?.calcium ?? '');
    setPotassium(waterAnalysis?.potassium ?? '');
    setLithium(waterAnalysis?.lithium ?? '');
    setMagnesium(waterAnalysis?.magnesium ?? '');
    setSodium(waterAnalysis?.sodium ?? '');
    setPhosphates(waterAnalysis?.phosphates ?? '');
    setStrontium(waterAnalysis?.strontium ?? '');
    setZinc(waterAnalysis?.zinc ?? '');
    setSulfates(waterAnalysis?.sulfates ?? '');
    setSpecificGravity(waterAnalysis?.specificGravity ?? '');
  }, [waterAnalysis]);

  // --- Handler: Form Submit ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampleFk) return;
    const data: WaterAnalysisData = {
      id: id || crypto.randomUUID(),
      sampleFk,
      sampleName,
      dateAnalyzed: dateAnalyzed || null,
      bwpd: bwpd === '' ? null : (bwpd as number),
      mcfd: mcfd === '' ? null : (mcfd as number),
      ph: ph === '' ? null : (ph as number),
      dissolvedCO2: dissolvedCO2 === '' ? null : (dissolvedCO2 as number),
      dissolvedH2S: dissolvedH2S === '' ? null : (dissolvedH2S as number),
      gasCO2: gasCO2 === '' ? null : (gasCO2 as number),
      gasH2S: gasH2S === '' ? null : (gasH2S as number),
      totalDissolvedSolids: totalDissolvedSolids === '' ? null : (totalDissolvedSolids as number),
      chlorides: chlorides === '' ? null : (chlorides as number),
      bicarbonates: bicarbonates === '' ? null : (bicarbonates as number),
      ironTotal: ironTotal === '' ? null : (ironTotal as number),
      manganese: manganese === '' ? null : (manganese as number),
      barium: barium === '' ? null : (barium as number),
      calcium: calcium === '' ? null : (calcium as number),
      potassium: potassium === '' ? null : (potassium as number),
      lithium: lithium === '' ? null : (lithium as number),
      magnesium: magnesium === '' ? null : (magnesium as number),
      sodium: sodium === '' ? null : (sodium as number),
      phosphates: phosphates === '' ? null : (phosphates as number),
      strontium: strontium === '' ? null : (strontium as number),
      zinc: zinc === '' ? null : (zinc as number),
      sulfates: sulfates === '' ? null : (sulfates as number),
      specificGravity: specificGravity === '' ? null : (specificGravity as number),
    };
    onSave(data);
  };

  // --- Render ---
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-0">
        <div className="flex justify-between items-center mb-4 px-6 pt-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {waterAnalysis ? 'Edit Water Analysis' : 'New Water Analysis'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto px-6 pb-2">
          {/* Identifiers */}
          {/* TODO: For new test types, update identifier fields as needed */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Identifiers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                <input
                  type="text"
                  value={id}
                  onChange={e => setId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sample</label>
                <SearchableSelect
                  value={selectedSample}
                  onSelect={opt => {
                    setSampleFk(opt.id);
                    setSampleName(opt.label);
                  }}
                  onSearch={handleSampleSearch}
                  options={sampleOptions}
                  loading={sampleLoading}
                  placeholder="Select sample"
                />
              </div>
            </div>
          </div>

          {/* Analysis Info */}
          {/* TODO: For new test types, update analysis info fields as needed */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Analysis Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Analyzed</label>
                <input
                  type="date"
                  value={dateAnalyzed ? dateAnalyzed.slice(0, 10) : ''}
                  onChange={e => setDateAnalyzed(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Basic Metrics */}
          {/* TODO: For new test types, update basic metrics fields as needed */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Basic Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BWPD</label>
                <input
                  type="number"
                  step="any"
                  value={bwpd ?? ''}
                  onChange={e => setBwpd(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MCFD</label>
                <input
                  type="number"
                  step="any"
                  value={mcfd ?? ''}
                  onChange={e => setMcfd(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">pH</label>
                <input
                  type="number"
                  step="any"
                  value={ph ?? ''}
                  onChange={e => setPh(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specific Gravity</label>
                <input
                  type="number"
                  step="any"
                  value={specificGravity ?? ''}
                  onChange={e => setSpecificGravity(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Gas & Dissolved Gases */}
          {/* TODO: For new test types, update gas fields as needed */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Gas & Dissolved Gases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dissolved CO₂</label>
                <input
                  type="number"
                  step="any"
                  value={dissolvedCO2 ?? ''}
                  onChange={e => setDissolvedCO2(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dissolved H₂S</label>
                <input
                  type="number"
                  step="any"
                  value={dissolvedH2S ?? ''}
                  onChange={e => setDissolvedH2S(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gas CO₂</label>
                <input
                  type="number"
                  step="any"
                  value={gasCO2 ?? ''}
                  onChange={e => setGasCO2(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gas H₂S</label>
                <input
                  type="number"
                  step="any"
                  value={gasH2S ?? ''}
                  onChange={e => setGasH2S(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Ions & Salts */}
          {/* TODO: For new test types, update ions/salts fields as needed */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Ions & Salts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Dissolved Solids</label>
                <input
                  type="number"
                  step="any"
                  value={totalDissolvedSolids ?? ''}
                  onChange={e => setTotalDissolvedSolids(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chlorides</label>
                <input
                  type="number"
                  step="any"
                  value={chlorides ?? ''}
                  onChange={e => setChlorides(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bicarbonates</label>
                <input
                  type="number"
                  step="any"
                  value={bicarbonates ?? ''}
                  onChange={e => setBicarbonates(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Iron Total</label>
                <input
                  type="number"
                  step="any"
                  value={ironTotal ?? ''}
                  onChange={e => setIronTotal(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manganese</label>
                <input
                  type="number"
                  step="any"
                  value={manganese ?? ''}
                  onChange={e => setManganese(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Barium</label>
                <input
                  type="number"
                  step="any"
                  value={barium ?? ''}
                  onChange={e => setBarium(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Calcium</label>
                <input
                  type="number"
                  step="any"
                  value={calcium ?? ''}
                  onChange={e => setCalcium(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Potassium</label>
                <input
                  type="number"
                  step="any"
                  value={potassium ?? ''}
                  onChange={e => setPotassium(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lithium</label>
                <input
                  type="number"
                  step="any"
                  value={lithium ?? ''}
                  onChange={e => setLithium(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Magnesium</label>
                <input
                  type="number"
                  step="any"
                  value={magnesium ?? ''}
                  onChange={e => setMagnesium(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sodium</label>
                <input
                  type="number"
                  step="any"
                  value={sodium ?? ''}
                  onChange={e => setSodium(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phosphates</label>
                <input
                  type="number"
                  step="any"
                  value={phosphates ?? ''}
                  onChange={e => setPhosphates(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Strontium</label>
                <input
                  type="number"
                  step="any"
                  value={strontium ?? ''}
                  onChange={e => setStrontium(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zinc</label>
                <input
                  type="number"
                  step="any"
                  value={zinc ?? ''}
                  onChange={e => setZinc(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sulfates</label>
                <input
                  type="number"
                  step="any"
                  value={sulfates ?? ''}
                  onChange={e => setSulfates(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 left-0 bg-white pt-4 pb-2 flex justify-end space-x-2 border-t border-gray-200 z-10">
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

export default WaterAnalysisDetailModal;
