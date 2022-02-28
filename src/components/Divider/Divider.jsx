import React from 'react';
import styles from './Divider.module.scss';

const Divider = ({ className }) => {
  return <div className={`${styles.divider} ${className}`}></div>;
};

export default Divider;
