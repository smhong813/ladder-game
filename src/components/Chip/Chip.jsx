import React, { useEffect, useState } from 'react';
import styles from './Chip.module.scss';

const Chip = ({ id, title, description, onChange = (data) => {}, on }) => {
  const [selected, setSelected] = useState(on || false);

  const handleClick = () => {
    setSelected((prev) => !prev);
  };
  useEffect(() => {
    onChange({ id, title, description, selected });
  }, [selected]);
  return (
    <button
      className={`${styles.chip} ${selected && styles.on}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Chip;