import React, { useEffect, useState } from 'react';
import Chip from '../Chip';
import styles from './Chips.module.scss';

const Chips = ({
  options = [],
  initialValueIndexes = [],
  onChange = (data) => {},
  allowMultipleChoice = false,
}) => {
  const [chips, setChips] = useState(
    initialValueIndexes.map((index) => options[index])
  );
  const handleChip = (selectedChip) => {
    if (!selectedChip.selected) return;
    if (allowMultipleChoice) {
      setChips(...selectedChip, selectedChip);
    } else {
      setChips([selectedChip]);
    }
  };

  useEffect(() => {
    onChange(chips);
  }, [chips]);

  return (
    <div className={styles.chips}>
      {options.map((option) => (
        <Chip
          key={option.id}
          id={option.id}
          title={option.value}
          description={option.description}
          options={option.options}
          chance={option.chance}
          onChange={handleChip}
          on={chips.some((chip) => chip.id === option.id)}
        />
      ))}
    </div>
  );
};

export default Chips;
