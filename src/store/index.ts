import { ICounterState } from './reducers/counterReducer';
import { ITextFieldState } from './reducers/textFieldReducer';

interface IStore {
  counter: ICounterState,
  textField: ITextFieldState,
}

export {
  ICounterState,
  ITextFieldState,
  IStore,
};
