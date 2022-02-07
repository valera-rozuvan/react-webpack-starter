import {useEffect, useState} from 'react';

interface MyStore {
  getState: Function;
  setState: (fn: (state: MyState) => MyState) => void;
  subscribe: Function;
}

interface MyState {
  count: number;
  text: string;
}

const createStore = (initialState: MyState): MyStore => {
  let state: MyState = initialState;

  const getState = () => state;

  const listeners: Set<Function> = new Set();

  const setState = (fn: (state: MyState) => MyState) => {
    state = fn(state);
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: Function) => {
    listeners.add(listener);

    return () => listeners.delete(listener);
  };

  return {getState, setState, subscribe};
};

export const useStore = (store: MyStore, selector: Function) => {
  const [state, setState] = useState(() => selector(store.getState()))

  useEffect(() => {
    const callback = () => setState(selector(store.getState()));

    const unsubscribe = store.subscribe(callback);

    callback();

    return unsubscribe;
  }, [store, selector]);

  return state;
};

export const store = createStore({count: 0, text: "hello"});
