import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import rootReducer from './store/reducers/rootReducer';

import App from './App';

console.log(`process.env.REACT_APP_BASE_URL = '${process.env.REACT_APP_BASE_URL}'`); // eslint-disable-line no-console
console.log(`process.env.REACT_APP_API_URL = '${process.env.REACT_APP_API_URL}'`); // eslint-disable-line no-console

const store = createStore(rootReducer);

const root = document.getElementById('root');
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  root,
);
