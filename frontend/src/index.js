import React from 'react';
import ReactDOM from 'react-dom/client';
import { BookProvider } from './contexts/BookContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BookProvider>
      <App />
    </BookProvider>
  </React.StrictMode>
);
