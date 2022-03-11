import React from 'react';
import styles from './SectionHeader.module.scss';

const SectionHeader = ({
  title,
  backgroundColor,
  btnTitle,
  btnOnClick,
  btnDisabled,
}) => {
  // console.log('btnDisabled:', btnDisabled);
  return (
    <div
      className={styles.sectionHeader}
      style={{ backgroundColor: backgroundColor }}
    >
      <h3 className={styles.title}>{title}</h3>
      <button
        className={styles.button}
        onClick={btnOnClick}
        disabled={btnDisabled}
      >
        {btnTitle}
      </button>
    </div>
  );
};

export default SectionHeader;
