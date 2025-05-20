import React, { useEffect, useState, useRef } from 'react';
import { objectTypes } from '../data/mockData';
import { ChevronDownIcon, LayoutDashboard } from 'lucide-react';
import { createPortal } from 'react-dom';
interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}
const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const [isAnalysesOpen, setIsAnalysesOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Separate analyses from other objects
  const analyses = ['waterAnalyses', 'oilAnalyses', 'bacteriaAnalyses', 'atpBacteriaAnalyses', 'millipores', 'corrosionInhibitorResiduals', 'scaleInhibitorResiduals', 'couponAnalyses'];
  const mainObjects = objectTypes.filter(type => !analyses.includes(type.id));
  const analysesObjects = objectTypes.filter(type => analyses.includes(type.id));
  // Update dropdown position when button is clicked
  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setTimeout(() => {
          setIsAnalysesOpen(false);
        }, 200);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // Update position when dropdown opens
  useEffect(() => {
    if (isAnalysesOpen) {
      updateDropdownPosition();
    }
  }, [isAnalysesOpen]);
  return <div className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === 'dashboard' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => onTabChange('dashboard')}>
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          {mainObjects.map(objectType => <button key={objectType.id} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === objectType.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => onTabChange(objectType.id)}>
              {objectType.label}
            </button>)}
          <button ref={buttonRef} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-1 ${analysesObjects.some(obj => obj.id === activeTab) ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setIsAnalysesOpen(!isAnalysesOpen)}>
            <span>Analyses</span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </nav>
      </div>
      {isAnalysesOpen && createPortal(<div className="fixed z-50" style={{
      top: `${dropdownPosition.top}px`,
      left: `${dropdownPosition.left}px`
    }}>
            <div className="mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
              {analysesObjects.map(objectType => <button key={objectType.id} className={`block w-full text-left px-4 py-2 text-sm ${activeTab === objectType.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => {
          onTabChange(objectType.id);
          setIsAnalysesOpen(false);
        }}>
                  {objectType.label}
                </button>)}
            </div>
          </div>, document.body)}
    </div>;
};
export default TabNavigation;