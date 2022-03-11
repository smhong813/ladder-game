import React from 'react';
import styles from './MainFooter.module.scss';

const MainFooter = ({
  mainBtnTitle,
  mainBtnOnClick,
  subBtnIcon,
  subBtnOnClick,
  count,
  showCount,
  disabled = false,
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <button className={`${styles.outline} ${styles.subBtn}`}>
          {subBtnIcon}
        </button>
        <button
          className={`${styles.solid} ${styles.mainBtn}`}
          disabled={disabled || count < 2}
        >
          <span className={styles.title}>{mainBtnTitle}</span>
          {showCount && <span className={styles.count}>{count}</span>}
        </button>
      </div>
    </footer>
  );
};

export default MainFooter;
