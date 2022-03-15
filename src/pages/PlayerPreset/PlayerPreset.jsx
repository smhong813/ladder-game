import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import OptionSelectItem from '../../components/OptionSelectItem';

import { makeOptions } from '../../utils/settings';

import setting from '../../store/settings.json';
import i18n from '../../i18n/i18n.json';
import styles from './PlayerPreset.module.scss';
import Divider from '../../components/Divider';
import ChipsItem from '../../components/ChipsItem';
import { actions as settingActions } from '../../store/slices/setting';
import { actions as bottomSheetActions } from '../../store/slices/bottomSheet';

// Preset popups(Player and Prize) don't maintain its state.
const PlayerPreset = () => {
  const [chips, setChips] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  const totalPlayersOptions = makeOptions(setting['total-players']);
  const playerPresetOptions = makeOptions(setting['player-preset']);

  const handleSettingChange = (name, option) => {
    console.log('name:', name, 'option:', option);
    setTotal(+option.value);
  };
  const handlePresetChange = (chips) => {
    setChips(chips);
    console.log(chips);
  };
  const applyPreset = () => {
    const players = chips[0].options['en'].slice(0, total);
    console.log(players);
    dispatch(settingActions.setPlayers(players));
    dispatch(
      settingActions.setPreset({
        type: 'player',
        preset: chips[0].id,
      })
    );
    dispatch(bottomSheetActions.close(true));
  };

  const handleCancel = () => {
    // TODO: Call BottomSheet's close function...
    dispatch(bottomSheetActions.close(true));
  };
  return (
    <div className={styles.popup}>
      <h2 className={styles.title}>
        {i18n.popup.title['player-preset']['en']}
      </h2>
      <div className={styles.content}>
        <div className={styles.optionGroup}>
          <OptionSelectItem
            name='total-players'
            title={i18n.popup.option.title['total-players']['en']}
            options={totalPlayersOptions}
            onChange={handleSettingChange}
          />
        </div>
        <Divider />
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
        <button
          className='solid'
          disabled={chips.length === 0}
          onClick={applyPreset}
        >
          {i18n.popup.button.save['en']}
        </button>
      </Footer>
    </div>
  );
};

export default PlayerPreset;
