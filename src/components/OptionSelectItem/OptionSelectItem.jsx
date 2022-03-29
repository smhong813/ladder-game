import React from 'react';
import OptionSelect from '../OptionSelect';
import styles from './OptionSelectItem.module.scss';

const OptionSelectItem = ({
  className,
  name,
  title,
  options,
  initialIndex,
  onChange = (name, option) => {},
  disabled = false,
}) => {
  return (
    <div className={`${styles.optionSelectItem} ${className}`}>
      <span className={styles.title}>{title}</span>
      <OptionSelect
        className={styles.optionSelect}
        name={name}
        title={title}
        options={options}
        initialIndex={initialIndex}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default OptionSelectItem;
