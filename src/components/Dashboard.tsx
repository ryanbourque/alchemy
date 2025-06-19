import React, { useState, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { samples, waterAnalyses, bacteriaAnalyses, facilities, couponAnalyses, accounts } from '../data/mockData';
import { Activity, Droplet, AlertTriangle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SearchableSelect, Option } from '../components/form/SearchableSelect'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const Dashboard: React.FC = () => {
  const exportRef = useRef<HTMLDivElement>(null);
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  // prepare searchable account options with 'All'
  const accountOptions: Option[] = [
    { id: 'all', label: 'All Accounts' },
    ...accounts.map(acc => ({ id: acc.id, label: acc.name }))
  ];
  // Find the selected account option for value prop
  const selectedAccountOption = accountOptions.find(opt => opt.id === selectedAccount);
  // Filter samples by selected account
  const filteredSamples = selectedAccount === 'all' ? samples : samples.filter(sample => sample.ownerId === selectedAccount);
  const filteredSampleIds = new Set(filteredSamples.map(s => s.id));
  // Calculate samples by facility for selected account
  const samplesByFacility = facilities.map(facility => ({
    name: facility.name,
    samples: filteredSamples.filter(sample => sample.facilityId === facility.id).length
  }));
  // Calculate water quality metrics over time for selected account
  const waterQualityTrends = waterAnalyses
    .filter(analysis => filteredSampleIds.has(analysis.sampleId))
    .map(analysis => ({
      date: new Date(analysis.dateAnalyzed).toLocaleDateString(),
      pH: analysis.ph,
      tds: analysis.totalDissolvedSolids / 1000,
      chlorides: analysis.chlorides / 1000
    }));
  // Calculate bacterial activity for selected account
  const bacterialActivity = bacteriaAnalyses
    .filter(analysis => filteredSampleIds.has(analysis.sampleId))
    .map(analysis => ({
      id: analysis.id,
      apb: analysis.apbPositiveBottles,
      srb: analysis.srbPositiveBottles,
      date: new Date(analysis.apbReadingDate).toLocaleDateString()
    }));
  // Calculate average corrosion rates for selected account
  const filteredCouponAnalyses = couponAnalyses.filter(analysis => filteredSampleIds.has(analysis.sampleId));
  const avgCorrosionRate = filteredCouponAnalyses.reduce((acc, curr) => acc + curr.crMpy, 0) / (filteredCouponAnalyses.length || 1);
  // Calculate total and completion rate for selected account
  const totalSamples = filteredSamples.length;
  const completedSamples = filteredSamples.filter(sample => sample.completionDate).length;
  const completionRate = completedSamples / (totalSamples || 1) * 100;
  
  const handleDownloadPDF = () => {
    if (exportRef.current) {
      html2canvas(exportRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        // Portrait A4 with margins
        const pdf = new jsPDF('p', 'pt', 'a4');
        const margin = 40;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
        pdf.save('dashboard_report.pdf');
      });
    }
  };
  return <div className="space-y-6">
      {/* Toolbar with account selector and PDF download */}
      <div className="flex items-center justify-between mb-4 space-x-4">
        <div className="w-1/3">
          <SearchableSelect
            value={selectedAccountOption}
            options={accountOptions}
            onSelect={(opt: Option) => setSelectedAccount(opt.id)}
            onSearch={async (query: string) => accountOptions.filter(opt => opt.label.toLowerCase().includes(query.toLowerCase()))}
            placeholder="Select Account"
          />
        </div>
        <button onClick={handleDownloadPDF} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Download PDF
        </button>
      </div>
      {/* Report content to export */}
      <div ref={exportRef} className="space-y-6 bg-white p-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Samples</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalSamples}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Droplet className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Avg Corrosion Rate
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {avgCorrosionRate.toFixed(2)} MPY
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Water Analyses
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {waterQualityTrends.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Completion Rate
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {completionRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Samples by Facility */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Samples by Facility
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={samplesByFacility} dataKey="samples" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {samplesByFacility.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Water Quality Trends */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Water Quality Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={waterQualityTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pH" stroke="#8884d8" name="pH" strokeWidth={2} />
                <Line type="monotone" dataKey="tds" stroke="#82ca9d" name="TDS (k)" strokeWidth={2} />
                <Line type="monotone" dataKey="chlorides" stroke="#ffc658" name="Chlorides (k)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Bacterial Activity */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Bacterial Activity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bacterialActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="apb" fill="#8884d8" name="APB" />
                <Bar dataKey="srb" fill="#82ca9d" name="SRB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Corrosion Rates */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Corrosion Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredCouponAnalyses.map(analysis => ({
                date: new Date(analysis.dateAnalyzed).toLocaleDateString(),
                crMpy: analysis.crMpy,
                pitting: analysis.maxPittingRate
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="crMpy" fill="#8884d8" name="Corrosion Rate (MPY)" />
                <Bar dataKey="pitting" fill="#82ca9d" name="Max Pitting Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;