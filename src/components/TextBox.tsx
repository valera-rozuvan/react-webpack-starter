import React, {ChangeEvent, useCallback} from 'react';
import {store, useStore} from '../store';

const TextBox = () => {
  const text = useStore(
    store,
    useCallback((state) => state.text, [])
  );

  const setText = (event: ChangeEvent<HTMLInputElement>) => {
    debugger;
    store.setState((prev) => ({...prev, text: event.target.value}));
  };

  return (
    <div>
      <div>{text ? text : '\u00A0'}</div>
      <input value={text} onChange={setText}/>
    </div>
  );
};

export default TextBox;
