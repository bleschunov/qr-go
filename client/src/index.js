import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';

import AuthProvider from 'hoc/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <AuthProvider>
        <App /> 
    </AuthProvider>
  </BrowserRouter>
);
