import React, { useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import styles from './SequenceTextInput.module.scss';

const SequenceTextInput = ({
  className,
  name,
  value,
  placeholder,
  sequence = 0,
  minLength = 0,
  maxLength = 20,
  onChange = (name, value) => {},
  sequenceOnClick = (name) => {},
}) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef();

  const handleChange = (value) => {
    setInputValue(value);
    onChange(name, value);
  };

  return (
    <div className={`${styles.sequenceTextInput} ${className}`}>
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
          value={inputValue}
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
