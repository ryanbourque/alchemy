import React, { useState } from 'react';
import { formatDate } from '../data/mockData';
import { formatFieldLabel, getObjectFields, getRelatedObjectName } from '../utils/dataUtils';
import { formConfig, FormConfigItem } from '../data/formConfig';
import { SearchIcon, PlusIcon, ArrowUpDown, Download } from 'lucide-react';
interface ListViewProps {
  objectTypeId: string;
  data: Record<string, unknown>[];
  onRowClick: (id: string) => void;
  onNewClick: () => void;
}
const ListView: React.FC<ListViewProps> = ({
  objectTypeId,
  data,
  onRowClick,
  onNewClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const allFields = getObjectFields(objectTypeId).filter(f => f.id !== 'id');
  // Determine which fields to display based on formConfig listView
  const configItem: FormConfigItem | undefined = formConfig[objectTypeId];
  const displayFields = configItem
    ? configItem.listView.fields
        .map(id => allFields.find(f => f.id === id))
        .filter((f): f is typeof allFields[0] => Boolean(f))
    : allFields.slice(0, 6);
  // Filter data - simplified to only use search term
  const filteredData = data.filter(item => {
    return Object.values(item).some(value => {
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });
  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const aValRaw = a[sortField];
    const bValRaw = b[sortField];
    const aVal = aValRaw as string | number | null;
    const bVal = bValRaw as string | number | null;
    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;
    let comparison = 0;
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      comparison = aVal < bVal ? -1 : 1;
    } else {
      comparison = String(aVal).localeCompare(String(bVal));
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  // Format cell value based on type
  const formatCellValue = (value: unknown, fieldId: string): string => {
    if (value === null || value === undefined) return '-';
    const field = allFields.find(f => f.id === fieldId);
    if (!field) return String(value);
    if (fieldId.endsWith('Id')) {
      const relatedObjectType = fieldId.replace('Id', 's');
      return getRelatedObjectName(relatedObjectType, String(value));
    }
    switch (field.type) {
      case 'date':
        return formatDate(String(value));
      case 'checkbox':
        return (value as boolean) ? 'Yes' : 'No';
      default:
        return String(value);
    }
  };
  return <div className="mt-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => {
          const csv = [displayFields.map(field => field.label).join(','), ...sortedData.map(item => displayFields.map(field => {
            const value = formatCellValue(item[field.id], field.id);
            return `"${value.replace(/"/g, '""')}"`;
          }).join(','))].join('\n');
          const blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
          });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${objectTypeId}_export.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }} className="px-4 py-2 flex items-center space-x-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button onClick={onNewClick} className="px-4 py-2 flex items-center space-x-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <PlusIcon className="h-4 w-4" />
            <span>New</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {displayFields.map(field => <th key={field.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group" onClick={() => {
              if (sortField === field.id) {
                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
              } else {
                setSortField(field.id);
                setSortDirection('asc');
              }
            }}>
                  <div className="flex items-center space-x-1">
                    <span>{formatFieldLabel(field.id)}</span>
                    <ArrowUpDown className={`h-4 w-4 opacity-0 group-hover:opacity-100 ${sortField === field.id ? 'opacity-100' : ''}`} />
                  </div>
                </th>)}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? <tr>
                <td colSpan={displayFields.length + 1} className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  No data found
                </td>
              </tr> : paginatedData.map(item => {
                const id = String(item.id);
                return (
                  <tr key={id} onClick={() => onRowClick(id)} className="hover:bg-gray-50 cursor-pointer">
                    {displayFields.map(field => (
                      <td key={`${id}-${field.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCellValue(item[field.id], field.id)}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={e => {
                        e.stopPropagation();
                        onRowClick(id);
                      }} className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                );
             })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select value={pageSize} onChange={e => {
          setPageSize(Number(e.target.value));
          setCurrentPage(1);
        }} className="border border-gray-300 rounded-md text-sm">
            {[10, 50, 100].map(size => <option key={size} value={size}>
                {size}
              </option>)}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>;
};
export default ListView;