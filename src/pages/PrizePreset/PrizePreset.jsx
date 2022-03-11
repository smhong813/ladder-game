import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Footer from '../../components/Footer';
import ChipsItem from '../../components/ChipsItem';

import { makeOptions } from '../../utils/settings';
import { actions as bottomSheetActions } from '../../store/slices/bottomSheet';

import setting from '../../store/settings.json';
import i18n from '../../i18n/i18n.json';
import styles from './PrizePreset.module.scss';

const PrizePreset = ({ onClose }) => {
  const [chips, setChips] = useState([]);
  const dispatch = useDispatch();

  const playerPresetOptions = makeOptions(setting['prize-preset']);

  const handlePresetChange = (chips) => {
    setChips(chips);
  };
  const handleCancel = () => {
    dispatch(bottomSheetActions.close(true));
  };
  return (
    <div className={styles.popup}>
      <h2 className={styles.title}>{i18n.popup.title['prize-preset']['en']}</h2>
      <div className={styles.content}>
        <div className={styles.optionGroup}>
          <ChipsItem
            title={i18n.popup.option.title.preset['en']}
            options={playerPresetOptions}
            initialValues={['number']}
            onChange={handlePresetChange}
          />
        </div>
        <p
          className={`${styles.optionDescription} ${
            chips.length > 0 && styles.visible
          }`}
        >
          {chips.length > 0 ? chips[0].description['en'] : 'Decsription'}
        </p>
      </div>
      <Footer className={styles.footer}>
        <button className='outline' onClick={handleCancel}>
          {i18n.popup.button.cancel['en']}
        </button>
        <button className='solid' disabled={chips.length === 0}>
          {i18n.popup.button.save['en']}
        </button>
      </Footer>
    </div>
  );
};

export default PrizePreset;
