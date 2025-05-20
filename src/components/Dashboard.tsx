import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { samples, waterAnalyses, bacteriaAnalyses, facilities, couponAnalyses } from '../data/mockData';
import { Activity, Droplet, AlertTriangle } from 'lucide-react';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const Dashboard: React.FC = () => {
  // Calculate samples by facility
  const samplesByFacility = facilities.map(facility => ({
    name: facility.name,
    samples: samples.filter(sample => sample.facilityId === facility.id).length
  }));
  // Calculate water quality metrics over time
  const waterQualityTrends = waterAnalyses.map(analysis => ({
    date: new Date(analysis.dateAnalyzed).toLocaleDateString(),
    pH: analysis.ph,
    tds: analysis.totalDissolvedSolids / 1000,
    chlorides: analysis.chlorides / 1000
  }));
  // Calculate bacterial activity
  const bacterialActivity = bacteriaAnalyses.map(analysis => ({
    id: analysis.id,
    apb: analysis.apbPositiveBottles,
    srb: analysis.srbPositiveBottles,
    date: new Date(analysis.apbReadingDate).toLocaleDateString()
  }));
  // Calculate average corrosion rates
  const avgCorrosionRate = couponAnalyses.reduce((acc, curr) => acc + curr.crMpy, 0) / couponAnalyses.length;
  // Calculate total samples
  const totalSamples = samples.length;
  // Calculate completion rate
  const completedSamples = samples.filter(sample => sample.completionDate).length;
  const completionRate = completedSamples / totalSamples * 100;
  return <div className="space-y-6">
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
                {waterAnalyses.length}
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
                {samplesByFacility.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
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
            <BarChart data={couponAnalyses.map(analysis => ({
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
    </div>;
};
export default Dashboard;