import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot for React 18+
import './index.css'; // Import your Tailwind CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
