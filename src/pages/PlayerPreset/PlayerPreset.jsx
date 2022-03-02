import React, { useState } from 'react';
import Footer from '../../components/Footer';
import OptionSelectItem from '../../components/OptionSelectItem';

import { makeOptions } from '../../utils/settings';

import setting from '../../store/settings.json';
import i18n from '../../i18n/i18n.json';
import styles from './PlayerPreset.module.scss';
import Divider from '../../components/Divider';
import ChipsItem from '../../components/ChipsItem';

const PlayerPreset = () => {
  const [chips, setChips] = useState([]);

  const totalPlayersOptions = makeOptions(setting['total-players']);
  const playerPresetOptions = makeOptions(setting['player-preset']);

  const handleSettingChange = (name, option) => {
    console.log('name:', name, 'option:', option);
  };
  const handlePresetChange = (chips) => {
    setChips(chips);
  };
  return (
    <div className={styles.popup}>
      <h2 className={styles.title}>
        {i18n.popup.title['player-preset']['ko']}
      </h2>
      <div className={styles.content}>
        <div className={styles.optionGroup}>
          <OptionSelectItem
            name='total-players'
            title={i18n.popup.option.title['total-players']['ko']}
            options={totalPlayersOptions}
            onChange={handleSettingChange}
          />
        </div>
        <Divider />
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

export default PlayerPreset;
