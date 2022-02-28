import React, { useEffect, useState } from 'react';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import styles from './OptionSelect.module.scss';

const OptionSelect = ({
  name,
  options,
  initialIndex,
  onChange = (name, option) => {},
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex || 0);
  const length = Object.keys(options).length;
  const handleChange = (direction) => {
    let newValue;
    if (direction > 0) {
      newValue =
        selectedIndex + 1 >= length ? selectedIndex : selectedIndex + 1;
    } else if (direction < 0) {
      newValue = selectedIndex - 1 <= -1 ? 0 : selectedIndex - 1;
    }
    setSelectedIndex(newValue);
  };

  useEffect(() => {
    onChange(name, options[selectedIndex]);
  }, [selectedIndex]);

  return (
    <div className={styles.optionSelect}>
      <button
        className={styles.arrowBtn}
        onClick={() => handleChange(-1)}
        disabled={selectedIndex === 0}
      >
        <MdOutlineArrowBackIosNew />
      </button>
      <span className={styles.option}>{options[selectedIndex].value}</span>
      <button
        className={styles.arrowBtn}
        onClick={() => handleChange(1)}
        disabled={selectedIndex === length - 1}
      >
        <MdOutlineArrowForwardIos />
      </button>
    </div>
  );
};

export default OptionSelect;
