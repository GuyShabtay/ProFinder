import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter,HashRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

//const publicUrl = "https://profinder-vzbv.onrender.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </BrowserRouter>
);
