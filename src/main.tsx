// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

/* Tailwind */
import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
