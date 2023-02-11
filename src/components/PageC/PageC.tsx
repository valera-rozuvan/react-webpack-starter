import React from 'react';

import styles from './styles.module.scss';

function PageC() {
  return (
    <div className={styles.colorBg}>
      <p>This image (located in component folder) is loaded as a CSS background property (defined in CSS module) for a div element:</p>
      <div className={styles.imgFromComponent} />

      <br />

      <p>Same as above, except the styles come from global CSS:</p>
      <div className="imgFromGlobalCSS" />

      <br />

      <p>This is an image tag:</p>
      <img className={styles.imgTag} src="bg3.png" alt="bg3" />
    </div>
  );
}

export default PageC;
