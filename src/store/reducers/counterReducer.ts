interface ICounterReducerAction {
  type?: string;
  data?: number;
}

interface ICounterState {
  number: number;
}

const counterReducer = (state: ICounterState = { number: 0 }, action: ICounterReducerAction) => {
  let newState = state;

  switch (action.type) {
    case 'SET_NUMBER':
      if (typeof action.data === 'undefined' || Number.isNaN(action.data)) {
        break;
      }

      newState = { number: action.data };

      break;
    default:
      break;
  }

  return newState;
};

export {
  counterReducer,
  ICounterState,
};
