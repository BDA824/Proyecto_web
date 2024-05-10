import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Usa createRoot directamente sin ReactDOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
