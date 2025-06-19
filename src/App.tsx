import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import TabNavigation from "./components/TabNavigation";
import ListView from "./components/ListView";
import DetailModal from "./components/DetailModal";
import Dashboard from "./components/Dashboard";
import { objectTypes } from "./data/mockData";
import { formConfig } from "./data/formConfig";
import AccountsListView from "./components/Accounts/ListView";
import ContactsListView from "./components/Contacts/ContactsListView";
import FacilitiesListView from "./components/Facilities/FacilitiesListView";
import SamplePointsListView from "./components/SamplePoints/SamplePointsListView";
import SamplesListView from "./components/Samples/SamplesListView";
import WaterAnalysesListView from "./components/WaterAnalysis/WaterAnalysisListView";
import AuthGuard from "./components/AuthGuard";
import ApiInitializer from "./components/ApiInitializer";

export function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataList, setDataList] = useState<Record<string, unknown>[]>([]);
  const activeObjectType = objectTypes.find((type) => type.id === activeTab);
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedObjectId(null);
    setIsModalOpen(false);
  };
  // Fetch data when activeTab changes
  useEffect(() => {
    const configItem = formConfig[activeTab];
    if (configItem?.fetcher) {
      configItem.fetcher().then((items) => setDataList(items || []));
    } else {
      setDataList([]);
    }
  }, [activeTab]);
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
  const handleSaveChanges = async (updatedData: Record<string, unknown>) => {
    if (activeTab) {
      const configItem = formConfig[activeTab];
      if (configItem) {
        if (selectedObjectId) {
          await configItem.update?.(selectedObjectId, updatedData);
        } else {
          await configItem.create?.(updatedData);
        }
        const items = await configItem.fetcher?.();
        setDataList(items || []);
      }
      setIsModalOpen(false);
      setSelectedObjectId(null);
    }
  };
  // Delete handler
  const handleDelete = async () => {
    const configItem = formConfig[activeTab];
    if (configItem && selectedObjectId) {
      await configItem.delete?.(selectedObjectId);
      const items = await configItem.fetcher?.();
      setDataList(items || []);
    }
    setIsModalOpen(false);
    setSelectedObjectId(null);
  };
  const getSelectedObjectData = (): Record<string, unknown> => {
    if (!selectedObjectId) return {};
    const item = dataList.find((obj) => String(obj["id"]) === selectedObjectId);
    return item || {};
  };  return (
    <AuthProvider>
      <AuthGuard>
        <ApiInitializer>
          <Layout>
            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
            {activeTab === "dashboard" ? (
        <div className="mt-4">
          <Dashboard />
        </div>
      ) : activeTab === "accounts" ? (
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Accounts</h2>
          <AccountsListView />
        </div>
      ) : activeTab === "contacts" ? (
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Contacts</h2>
          <ContactsListView />
        </div>
      ) : activeTab === "facilities" ? (
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Facilities</h2>
          <FacilitiesListView />
        </div>
      ) : activeTab === "samplepoints" ? (
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Sample Points
          </h2>
          <SamplePointsListView />
        </div>
      ) : activeTab === "samples" ? (
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Samples</h2>
          <SamplesListView />
        </div>
      ) : activeTab === "waterAnalyses" ? (
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Water Analyses</h2>
          <WaterAnalysesListView />
        </div>
      ) : (
        activeObjectType && (
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              {activeObjectType.label}
            </h2>
            <ListView
              objectTypeId={activeTab}
              data={dataList}
              onRowClick={handleRowClick}
              onNewClick={handleNewClick}
            />
          </div>
        )
      )}
      {isModalOpen && (
        <DetailModal
          objectTypeId={activeTab}          objectData={getSelectedObjectData()}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
          onDelete={selectedObjectId ? handleDelete : undefined}
        />
      )}
          </Layout>
        </ApiInitializer>
      </AuthGuard>
    </AuthProvider>
  );
}
