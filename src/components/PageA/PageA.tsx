import React from 'react';

import Counter from '../Counter';
import TextBox from '../TextBox';

import styles from './styles.module.scss';

function PageA() {
  return (
    <div className={styles.colorBg}>
      <Counter />
      <br />
      <Counter />
      <br />
      <TextBox />
      <br />
      <TextBox />
    </div>
  );
}

export default PageA;
