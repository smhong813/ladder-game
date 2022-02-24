import React from 'react';
import styles from './MainFooter.module.scss';

const MainFooter = ({
  mainBtnTitle,
  mainBtnOnClick,
  subBtnIcon,
  subBtnOnClick,
  count,
  showCount,
}) => {
  return (
    <footer className={styles.footer}>
      <button className={styles.subBtn}>{subBtnIcon}</button>
      <button className={styles.mainBtn} disabled={count === 0}>
        <span className={styles.title}>{mainBtnTitle}</span>
        {showCount && <span className={styles.count}>{count}</span>}
      </button>
    </footer>
  );
};

export default MainFooter;
