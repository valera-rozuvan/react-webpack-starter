import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { IStore, ICounterState } from '../store';

interface IProps {
  counter: ICounterState;
  dispatch: (arg: { type: string; data: number; }) => void;
}

function Counter(props: IProps) {
  const { counter, dispatch } = props;

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

function mapStateToProps(state: IStore) {
  return {
    counter: state.counter,
  };
}

export default connect(mapStateToProps)(Counter);
