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
  headerBackgroundColor,
  min,
  max,
  count,
  onChange = (data) => {},
  allowAdd,
  values,
}) => {
  const [inputs, setInputs] = useState([]);

  const handleInputChange = (sequence, value) => {
    const newInputs = [...inputs];
    newInputs[sequence - 1] = value;
    onChange(newInputs);
    setInputs(newInputs);
  };

  const addInput = () => {
    setInputs((prev) => {
      const newInputs = [...prev, ''];
      onChange(newInputs);
      return newInputs;
    });
  };

  const removeInput = (sequence) => {
    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs.splice(sequence - 1, 1);
      onChange(newInputs);
      return newInputs;
    });
  };

  useEffect(() => {
    // console.log('inputs.length:', inputs.length);
    // console.log('count:', count);
    if (inputs.length < count) {
      for (let i = inputs.length; i < count; i++) {
        addInput();
      }
    } else if (inputs.length > count) {
      for (let i = inputs.length; i > count; i--) {
        removeInput(i);
      }
    }
  }, [count]);

  useEffect(() => {
    if (!!values) {
      setInputs(values);
    }
  }, [values]);

  useEffect(() => {
    // TODO: Make two inputs by default.
  }, []);

  return (
    <section className={styles.multipleInputSection}>
      <SectionHeader
        title={title}
        backgroundColor={headerBackgroundColor}
        btnTitle={headerBtnTitle}
        btnOnClick={headerBtnOnClick}
        btnDisabled={count < 2 || false}
      />
      <div className={styles.inputContainer}>
        {inputs.map((value, index) => (
          <SequenceTextInput
            key={`${id}-${index}`}
            className={styles.sequenceTextInput}
            name={`${id}-${index}`}
            value={value}
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
