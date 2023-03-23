import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { AppThemeProvider } from './shared/theme/AppThemeProvider';
import { CssBaseline } from '@material-ui/core';
import { HashRouter } from 'react-router-dom';
import { AppModalProvider } from './shared/components/Modal/AppModalProvider';


ReactDOM.render(
  <HashRouter>
    <AppThemeProvider>
      <AppModalProvider>
        <CssBaseline />
        <App />
      </AppModalProvider>
    </AppThemeProvider>
  </HashRouter>,
  document.getElementById('root')
);
