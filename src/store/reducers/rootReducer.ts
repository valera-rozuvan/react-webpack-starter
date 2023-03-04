import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { textFieldReducer } from './textFieldReducer';
import { counterReducer } from './counterReducer';

const history = createBrowserHistory();

const rootReducer = combineReducers({
  counter: counterReducer,
  textField: textFieldReducer,
  router: connectRouter(history),
});

export {
  history,
  rootReducer,
};
