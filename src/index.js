import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App"

// create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// render app component into root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
