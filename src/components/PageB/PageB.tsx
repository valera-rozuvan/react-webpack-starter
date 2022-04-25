import React, { useCallback } from 'react';

import { store, useStore } from '../../store';

function PageB() {
  const count = useStore(
    store,
    useCallback((state) => state.count, []),
  );

  const text = useStore(
    store,
    useCallback((state) => state.text, []),
  );

  return (
    <div>
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
