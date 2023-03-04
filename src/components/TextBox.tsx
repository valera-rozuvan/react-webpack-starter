import React, { ChangeEvent, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { IStore, ITextFieldState } from '../store';

interface IProps {
  textField: ITextFieldState;
  dispatch: (arg: { type: string; data: string; }) => void;
}

function TextBox(props: IProps) {
  const { textField, dispatch } = props;

  const [text, setText] = useState('');

  useEffect(() => {
    setText(textField.text);
  }, [textField]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_TEXT', data: event.target.value });
  };

  return (
    <div>
      <div>
        text = &quot;
        {text}
        &quot;
      </div>
      <input value={text} onChange={onInputChange} />
    </div>
  );
}

function mapStateToProps(state: IStore) {
  return {
    textField: state.textField,
  };
}

export default connect(mapStateToProps)(TextBox);
