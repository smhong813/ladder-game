import React from 'react';
import styles from './SectionHeader.module.scss';

const SectionHeader = ({ title, btnTitle, btnOnClick }) => {
  return (
    <div className={styles.sectionHeader}>
      <h3 className={styles.title}>{title}</h3>
      <button className={styles.button} onClick={btnOnClick}>
        {btnTitle}
      </button>
    </div>
  );
};

export default SectionHeader;
