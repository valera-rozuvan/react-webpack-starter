import React from 'react';

import Counter from '../Counter';
import TextBox from '../TextBox';

function PageA() {
  return (
    <div>
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
