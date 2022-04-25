import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

console.log(`process.env.REACT_APP_BASE_URL = '${process.env.REACT_APP_BASE_URL}'`); // eslint-disable-line no-console
console.log(`process.env.REACT_APP_API_URL = '${process.env.REACT_APP_API_URL}'`); // eslint-disable-line no-console

const root = document.getElementById('root');
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root,
);
