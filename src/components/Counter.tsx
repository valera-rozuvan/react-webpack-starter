import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IStore from '../store';

function Counter() {
  const counter = useSelector((store: IStore) => store.counter);
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(counter.number);
  }, [counter]);

  const inc = () => {
    dispatch({ type: 'SET_NUMBER', data: count + 1 });
  };

  return (
    <div>
      count =
      {count}
      <button type="button" onClick={inc}>+1</button>
    </div>
  );
}

export default Counter;
