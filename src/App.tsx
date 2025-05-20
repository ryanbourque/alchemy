import React, { useState } from 'react';
import Layout from './components/Layout';
import TabNavigation from './components/TabNavigation';
import ListView from './components/ListView';
import DetailModal from './components/DetailModal';
import Dashboard from './components/Dashboard';
import { objectTypes } from './data/mockData';
import { updateObject } from './utils/dataUtils';
export function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // Changed default to dashboard
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeObjectType = objectTypes.find(type => type.id === activeTab);
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedObjectId(null);
    setIsModalOpen(false);
  };
  const handleRowClick = (id: string) => {
    setSelectedObjectId(id);
    setIsModalOpen(true);
  };
  const handleNewClick = () => {
    setSelectedObjectId(null);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedObjectId(null);
  };
  const handleSaveChanges = (updatedData: any) => {
    if (activeTab) {
      if (selectedObjectId) {
        updateObject(activeTab, selectedObjectId, updatedData);
      } else {
        // Handle new object creation here
        console.log('Creating new object:', updatedData);
      }
      setIsModalOpen(false);
      setSelectedObjectId(null);
    }
  };
  const getSelectedObjectData = () => {
    if (!activeObjectType) return null;
    if (!selectedObjectId) return {};
    return activeObjectType.data.find((item: any) => item.id === selectedObjectId);
  };
  return <Layout>
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'dashboard' ? <div className="mt-4">
          <Dashboard />
        </div> : activeObjectType && <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              {activeObjectType.label}
            </h2>
            <ListView objectTypeId={activeTab} data={activeObjectType.data} onRowClick={handleRowClick} onNewClick={handleNewClick} />
          </div>}
      {isModalOpen && <DetailModal objectTypeId={activeTab} objectData={getSelectedObjectData()} onClose={handleCloseModal} onSave={handleSaveChanges} />}
    </Layout>;
}