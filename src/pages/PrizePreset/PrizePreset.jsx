import React, { useState } from 'react';
import Footer from '../../components/Footer';

import { makeOptions } from '../../utils/settings';

import setting from '../../store/settings.json';
import i18n from '../../i18n/i18n.json';
import styles from './PrizePreset.module.scss';
import ChipsItem from '../../components/ChipsItem';

const PrizePreset = () => {
  const [chips, setChips] = useState([]);

  const playerPresetOptions = makeOptions(setting['prize-preset']);

  const handlePresetChange = (chips) => {
    setChips(chips);
  };
  return (
    <div className={styles.popup}>
      <h2 className={styles.title}>{i18n.popup.title['prize-preset']['ko']}</h2>
      <div className={styles.content}>
        <div className={styles.optionGroup}>
          <ChipsItem
            title={i18n.popup.option.title.preset['ko']}
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
          {chips.length > 0 ? chips[0].description['ko'] : 'Decsription'}
        </p>
      </div>
      <Footer className={styles.footer}>
        <button className='outline'>{i18n.popup.button.cancel['ko']}</button>
        <button className='solid' disabled={chips.length === 0}>
          {i18n.popup.button.save['ko']}
        </button>
      </Footer>
    </div>
  );
};

export default PrizePreset;
