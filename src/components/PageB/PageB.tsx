import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import IStore from '../../store';

import styles from './styles.module.scss';

function PageB() {
  const counter = useSelector((store: IStore) => store.counter);
  const textField = useSelector((store: IStore) => store.textField);

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

export default PageB;
