import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br /> Nothing have found
      </h1>
      <p className={styles.description}>Unfortunately, this page doesn't exist in our shop</p>
    </div>
  );
};

export default NotFoundBlock;
