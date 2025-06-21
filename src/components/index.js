import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './assets/styles/GlobalStyles';
import { darkTheme } from './assets/styles/themes';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render app with theme provider and router
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
