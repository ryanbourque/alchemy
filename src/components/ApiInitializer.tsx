import React from 'react';

interface ApiInitializerProps {
  children: React.ReactNode;
}

// No initialization needed for function key API
const ApiInitializer: React.FC<ApiInitializerProps> = ({ children }) => {
  return <>{children}</>;
};

export default ApiInitializer;
