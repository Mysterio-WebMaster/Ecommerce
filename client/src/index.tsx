import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import userReducer from './Components/Redux/user';
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux';

const store = configureStore({
    reducer:{
      user: userReducer
    }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>
);

