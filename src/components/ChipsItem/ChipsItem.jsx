import React from 'react';
import Chips from '../Chips';
import styles from './ChipsItem.module.scss';

const ChipsItem = ({
  title,
  className,
  options = [],
  initialValueIndexes = [],
  onChange = (data) => {},
  allowMultipleChoice = false,
}) => {
  return (
    <div className={`${styles.chipsItem} ${className}`}>
      <span className={styles.title}>{title}</span>
      <Chips
        title={title}
        options={options}
        initialValueIndexes={initialValueIndexes}
        onChange={onChange}
        allowMultipleChoice={allowMultipleChoice}
      />
    </div>
  );
};

export default ChipsItem;
