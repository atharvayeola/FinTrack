import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

const runtimeConfig = {
  realtimeUrl: (import.meta.env?.VITE_REALTIME_URL as string | undefined) ?? 'ws://localhost:4000/realtime',
};

if (typeof window !== 'undefined') {
  window.__FINTRACK_CONFIG__ = runtimeConfig;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
