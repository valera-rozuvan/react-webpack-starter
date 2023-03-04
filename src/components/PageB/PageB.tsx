import React, { useState } from 'react';
import { connect } from 'react-redux';

import { IStore, ICounterState, ITextFieldState } from '../../store';

import styles from './styles.module.scss';

interface IProps {
  counter: ICounterState;
  textField: ITextFieldState;
}

function PageB({ counter, textField }: IProps) {
  const [count] = useState(counter.number);
  const [text] = useState(textField.text);

  return (
    <div className={styles.colorBg}>
      <div>Page B</div>
      <br />
      <div>
        count =
        {' '}
        &quot;
        {count}
        &quot;
      </div>
      <br />
      <div>
        text =
        {' '}
        &quot;
        {text}
        &quot;
      </div>
    </div>
  );
}

function mapStateToProps(state: IStore) {
  return {
    counter: state.counter,
    textField: state.textField,
  };
}

export default connect(mapStateToProps)(PageB);
