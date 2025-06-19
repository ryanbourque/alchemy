import React, { ReactNode } from 'react';
import CustomLogo from './CustomLogo';
import AccountBadge from './AccountBadge';
import LogoSpring from '../assets/Spring Icon.svg';
interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  return <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">            <div className="flex items-center">
              <img src={LogoSpring} alt="logo" className="h-8 w-8" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">
                Oracle
              </h1>
            </div>
            <AccountBadge />
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>;
};
export default Layout;