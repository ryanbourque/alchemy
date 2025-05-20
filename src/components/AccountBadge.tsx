import React, { useEffect, useState, useRef } from 'react';
import { UserCircle, LogOut, Settings } from 'lucide-react';
import LoginModal from './LoginModal';
const AccountBadge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
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
  const handleLogin = (email: string, password: string, remember: boolean) => {
    console.log('Login attempt:', {
      email,
      password,
      remember
    });
    // Add actual login logic here
    setShowLoginModal(false);
  };
  return <div className="relative">
      <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
        <UserCircle className="h-8 w-8" />
      </button>
      {isOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <button onClick={() => {
        setIsOpen(false);
        setShowLoginModal(true);
      }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <Settings className="h-4 w-4 mr-2" />
            <span>Login</span>
          </button>
          <button onClick={() => {
        console.log('Logout clicked');
        setIsOpen(false);
      }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />}
    </div>;
};
export default AccountBadge;