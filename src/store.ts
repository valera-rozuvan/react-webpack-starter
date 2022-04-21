import { useEffect, useState } from 'react';

interface MyState {
  count: number;
  text: string;
}

type GetStateFn = () => MyState;
type ListenerFn = () => void;
type SubscribeFn = (listener: ListenerFn) => () => void;

// Make sure to update the possible return types to match the list of available types in `MyState`.
type SelectorFn = (state: MyState) => number | string;

interface MyStore {
  getState: GetStateFn;
  setState: (fn: (newState: MyState) => MyState) => void;
  subscribe: SubscribeFn;
}

const createStore = (initialState: MyState): MyStore => {
  let state: MyState = initialState;

  const getState = () => state;

  const listeners: Set<ListenerFn> = new Set();

  const setState = (fn: (newState: MyState) => MyState) => {
    state = fn(state);
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: ListenerFn) => {
    listeners.add(listener);

    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe };
};

export const useStore = (store: MyStore, selector: SelectorFn) => {
  const [state, setState] = useState(() => selector(store.getState()));

  useEffect(() => {
    const callback = () => setState(selector(store.getState()));

    const unsubscribe = store.subscribe(callback);

    callback();

    return unsubscribe;
  }, [store, selector]);

  return state;
};

export const store = createStore({ count: 0, text: 'hello' });
