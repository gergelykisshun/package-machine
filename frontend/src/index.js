import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import machineReducer from './store/machine';
import themeReducer from './store/theme';
import toastReducer from './store/toastMessage';

const store = configureStore({
  reducer: {
    machine: machineReducer,
    theme: themeReducer,
    toast: toastReducer
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
