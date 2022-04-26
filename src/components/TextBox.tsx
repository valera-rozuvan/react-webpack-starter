import React, { ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IStore from '../store';

function TextBox() {
  const textField = useSelector((store: IStore) => store.textField);
  const dispatch = useDispatch();

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

export default TextBox;
