import { combineReducers } from 'redux';

import { textFieldReducer } from './textFieldReducer';
import { counterReducer } from './counterReducer';

export default combineReducers({
  counter: counterReducer,
  textField: textFieldReducer,
});
