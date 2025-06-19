import React, { useEffect, useState, useRef } from 'react';
import { UserCircle, LogOut, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AccountBadge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { user, logout, isAuthenticated, error } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setTimeout(() => {
          setIsOpen(false);
        }, 200);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Don't render if not authenticated (AuthGuard handles this)
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="relative">
      <button 
        ref={buttonRef} 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-label="User menu"
      >
        <UserCircle className="h-8 w-8" />
        <span className="hidden sm:block text-sm font-medium">
          {user.name || user.username || 'User'}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name || user.username || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.localAccountId}
                </p>
              </div>
            </div>
          </div>
          
          {/* Error Display (if any) */}
          {error && (
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs">{error}</span>
              </div>
            </div>
          )}
          
          {/* Actions */}
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountBadge;