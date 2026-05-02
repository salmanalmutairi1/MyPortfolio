import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@fontsource-variable/fraunces/index.css';
import '@fontsource-variable/inter-tight/index.css';
import '@fontsource-variable/jetbrains-mono/index.css';
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/500.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';

import './src/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
