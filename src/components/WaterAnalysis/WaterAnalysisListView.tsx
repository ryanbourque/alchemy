// components/WaterAnalysesListView.tsx
import React, { useState } from 'react';
import type { UseWaterAnalysesResult } from '../../hooks/useWaterAnalyses';
import { formatFieldLabel, getObjectFields, formatDate } from '../../utils/dataUtils';
import { useWaterAnalyses } from '../../hooks/useWaterAnalyses';
import { SearchIcon, PlusIcon, ArrowUpDown, Download } from 'lucide-react';
import WaterAnalysisDetailModal from './WaterAnalysisDetailModal';
import { WaterAnalysis } from '../../types';

/**
 * Field definition type for table and form fields.
 * Update this if your field config shape is different.
 */
type FieldDef = {
  id: string;
  label: string;
  type: string;
};

/**
 * Helper to format a cell value for display in the table.
 * @param value The value to format
 * @param fieldId The field id
 * @param allFields The array of all field definitions
 */
function formatCell(value: unknown, fieldId: string, allFields: FieldDef[]): string {
  if (value == null) return '-';
  const field = allFields.find(f => f.id === fieldId);
  if (!field) return String(value);
  switch (field.type) {
    case 'date':
      return formatDate(String(value));
    case 'number':
      return String(value);
    default:
      return String(value);
  }
}

/**
 * Helper to export the current data as CSV.
 * @param displayFields The fields to display/export
 * @param data The data array
 */
function exportToCSV(displayFields: FieldDef[], data: WaterAnalysis[], allFields: FieldDef[]) {
  const csv = [
    displayFields.map(field => field.label).join(','),
    ...data.map(item =>
      displayFields
        .map(field => {
          const value = formatCell(item[field.id as keyof WaterAnalysis], field.id, allFields);
          return `"${value.replace(/"/g, '""')}"`;
        })
        .join(',')
    ),
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `wateranalyses_export.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * WaterAnalysesListView - List and manage Water Analyses records.
 *
 * TODO: For new test types, copy this file and update:
 *   - useWaterAnalyses -> use[NewTest] hook
 *   - WaterAnalysisDetailModal -> [NewTest]DetailModal
 *   - getObjectFields('wateranalyses') -> getObjectFields('newtest')
 *   - WaterAnalysis type -> NewTest type
 *   - displayFields as needed
 */
const WaterAnalysesListView: React.FC = () => {
  // --- State ---
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<string>('sampleName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedWA, setSelectedWA] = useState<WaterAnalysis | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Data Fetching ---
  const { data, total, loading, error, create, update, remove } = useWaterAnalyses(
    currentPage,
    pageSize,
    searchTerm,
    sortField,
    sortDirection
  ) as UseWaterAnalysesResult;

  // --- Field Definitions ---
  // TODO: Update these for new test types
  const allFields: FieldDef[] = getObjectFields('wateranalyses').filter((f: FieldDef) => f.id !== 'id');
  const displayFields: FieldDef[] = allFields.filter(f =>
    [
      'sampleName',
      'dateAnalyzed',
      'bwpd',
      'mcfd',
      'ph',
      'dissolvedCO2',
      'dissolvedH2S',
      'gasCO2',
      'gasH2S',
      'totalDissolvedSolids',
      'chlorides',
      'bicarbonates',
      'ironTotal',
      'manganese',
      'barium',
      'calcium',
      'potassium',
      'lithium',
      'magnesium',
      'sodium',
      'phosphates',
      'strontium',
      'zinc',
      'sulfates',
      'specificGravity',
    ].includes(f.id)
  );

  // --- Pagination ---
  const totalPages = Math.ceil(total / pageSize);
  const paginated = data;

  // --- Render ---
  return (
    <div className="mt-4">
      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <WaterAnalysisDetailModal
          waterAnalysis={selectedWA ?? undefined}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedWA(null);
          }}
          onSave={async (wa: WaterAnalysis) => {
            if (selectedWA) {
              await update(wa.id, wa);
            } else {
              await create(wa);
            }
            setIsModalOpen(false);
            setSelectedWA(null);
          }}
          onDelete={
            selectedWA
              ? async () => {
                  await remove(selectedWA.id);
                  setIsModalOpen(false);
                  setSelectedWA(null);
                }
              : undefined
          }
        />
      )}

      {/* Loading/Error States */}
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">Error: {error.message}</div>}

      {/* Top Bar: Search, Export, New */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Sample ID..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => exportToCSV(displayFields, data, allFields)}
            className="px-4 py-2 flex items-center space-x-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>

          <button
            onClick={() => {
              setSelectedWA(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 flex items-center space-x-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {displayFields.map(field => (
                <th
                  key={field.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                  onClick={() => {
                    if (sortField === field.id) {
                      setSortDirection(dir => (dir === 'asc' ? 'desc' : 'asc'));
                    } else {
                      setSortField(field.id);
                      setSortDirection('asc');
                    }
                    setCurrentPage(1);
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <span>{formatFieldLabel(field.id)}</span>
                    <ArrowUpDown
                      className={`h-4 w-4 opacity-0 group-hover:opacity-100 ${
                        sortField === field.id ? 'opacity-100' : ''
                      }`}
                    />
                  </div>
                </th>
              ))}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={displayFields.length + 1}
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              paginated.map(item => {
                const id = String(item.id);
                return (
                  <tr
                    key={id}
                    onClick={() => {
                      setSelectedWA(item);
                      setIsModalOpen(true);
                    }}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    {displayFields.map(field => (
                      <td
                        key={`${id}-${field.id}`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {formatCell(item[field.id as keyof WaterAnalysis], field.id, allFields)}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedWA(item);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md text-sm"
          >
            {[10, 50, 100].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterAnalysesListView;
