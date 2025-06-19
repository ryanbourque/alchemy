import React from 'react';
import './index.css';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { testAuthConfiguration } from './utils/authConfigTest';

// Test authentication configuration in development
if (import.meta.env.DEV) {
  testAuthConfiguration();
}

render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>, 
  document.getElementById('root')
);