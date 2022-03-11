import React, { useEffect, useState } from 'react';
import styles from './Chip.module.scss';

const Chip = ({
  id,
  title,
  description,
  options,
  onChange = (data) => {},
  on,
}) => {
  const [selected, setSelected] = useState(on || false);

  const handleClick = () => {
    setSelected((prev) => !prev);
  };
  useEffect(() => {
    onChange({ id, title, description, options, selected });
  }, [selected]);

  useEffect(() => {
    setSelected(on);
  }, [on]);
  return (
    <button
      className={`${styles.chip} ${on && styles.on}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Chip;
