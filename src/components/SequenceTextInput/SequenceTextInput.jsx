import React, { useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import styles from './SequenceTextInput.module.scss';

const SequenceTextInput = ({
  name,
  placeholder,
  sequence = 0,
  minLength = 0,
  maxLength = 20,
  onChange = (name, value) => {},
  sequenceOnClick = (name) => {},
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const handleChange = (value) => {
    setValue(value);
    onChange(name, value);
  };

  return (
    <div className={styles.sequenceTextInput}>
      <button className={styles.sequence} onClick={() => sequenceOnClick(name)}>
        {sequence}
      </button>
      <div className={styles.textInput}>
        <input
          className={styles.input}
          type='text'
          name={name}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          ref={inputRef}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        />
        <button
          className={`${styles.resetBtn} ${
            value.length === 0 && styles.hidden
          }`}
          onClick={() => {
            handleChange('');
            inputRef.current.focus();
          }}
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default SequenceTextInput;