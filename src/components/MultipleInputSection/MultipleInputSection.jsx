import React, { useEffect, useState } from 'react';
import SectionHeader from '../SectionHeader';
import SequenceTextInput from '../SequenceTextInput';
import { MdOutlineAdd } from 'react-icons/md';
import styles from './MultipleInputSection.module.scss';

const MultipleInputSection = ({
  id,
  title,
  headerBtnTitle,
  headerBtnOnClick,
  min,
  max,
  count,
  onChange = (data) => {},
  allowAdd,
}) => {
  const [inputs, setInputs] = useState({});
  const [inputSerial, setInputSerial] = useState(1);

  const handleInputChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const addInput = () => {
    setInputs((inputs) => ({ ...inputs, [`${id}-input-${inputSerial}`]: '' }));
    setInputSerial((inputSerial) => inputSerial + 1);
  };

  const removeInput = (name) => {
    const newInputs = Object.assign({}, inputs);
    delete newInputs[name];
    setInputs(newInputs);
  };

  useEffect(() => {
    onChange(inputs);
  }, [inputs, onChange]);

  useEffect(() => {
    if (count >= 0) {
      const currentLength = Object.keys(inputs).length;
      if (count > currentLength) {
        for (let i = 0; i < count - currentLength; i++) {
          addInput();
        }
      } else if (count < currentLength) {
        const ids = Object.keys(inputs);
        for (let i = 0; i < currentLength - count; i++) {
          removeInput(ids.pop());
        }
      }
    }
  }, [count]);

  useEffect(() => {
    // TODO: Make two inputs by default.
  }, []);

  return (
    <section className={styles.multipleInputSection}>
      <SectionHeader
        title={title}
        btnTitle={headerBtnTitle}
        btnOnClick={headerBtnOnClick}
      />
      <div className={styles.inputContainer}>
        {(Object.keys(inputs) || []).map((key, index) => (
          <SequenceTextInput
            key={key}
            className={styles.sequenceTextInput}
            name={key}
            value={inputs[key]}
            sequence={index + 1}
            onChange={handleInputChange}
            sequenceOnClick={removeInput}
          />
        ))}
      </div>
      {allowAdd && (
        <div className={styles.addBtnContainer}>
          <button className={styles.addBtn} onClick={addInput}>
            <MdOutlineAdd />
          </button>
        </div>
      )}
    </section>
  );
};

export default MultipleInputSection;
