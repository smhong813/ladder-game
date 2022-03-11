import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../../components/Footer';
import ChipsItem from '../../components/ChipsItem';

import { makeOptions } from '../../utils/settings';
import { actions as bottomSheetActions } from '../../store/slices/bottomSheet';
import { actions as settingActions } from '../../store/slices/setting';

import setting from '../../store/settings.json';
import i18n from '../../i18n/i18n.json';
import styles from './PrizePreset.module.scss';
import { selectors as settingSelectors } from '../../store/slices/setting';

const PrizePreset = ({ count }) => {
  const [chips, setChips] = useState([]);
  const dispatch = useDispatch();

  const playerPresetOptions = makeOptions(setting['prize-preset']);
  // const numberOfPlayers = useSelector(settingSelectors.player).length;
  const numberOfPlayers = count;
  console.log('numberOfPlayers:', numberOfPlayers);

  const handlePresetChange = (chips) => {
    setChips(chips);
  };
  const handleCancel = () => {
    dispatch(bottomSheetActions.close(true));
  };
  const applyPreset = () => {
    const chance = chips[0].chance;
    let prizes = Array(numberOfPlayers).fill(chips[0].options['en'][1]);

    if (chance === 'one') {
      const randomIndex = Math.floor(Math.random() * numberOfPlayers);
      prizes[randomIndex] = chips[0].options['en'][0];
    } else if (chance === 'half') {
      const indexArray = [];
      do {
        const randomIndex = Math.floor(Math.random() * numberOfPlayers);
        if (!indexArray.includes(randomIndex)) {
          indexArray.push(randomIndex);
          prizes[randomIndex] = chips[0].options['en'][0];
        }
      } while (indexArray.length < Math.floor(numberOfPlayers / 2));
    }

    console.log('prizes:', prizes);
    dispatch(settingActions.setPrizes(prizes));
    dispatch(
      settingActions.setPreset({
        type: 'prize',
        preset: chips[0].id,
      })
    );
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
        <button
          className='solid'
          onClick={applyPreset}
          disabled={chips.length === 0}
        >
          {i18n.popup.button.save['en']}
        </button>
      </Footer>
    </div>
  );
};

export default PrizePreset;
