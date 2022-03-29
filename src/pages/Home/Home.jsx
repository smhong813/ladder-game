import React, { useEffect, useState } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';

import MainFooter from '../../components/MainFooter';
import MultipleInputSection from '../../components/MultipleInputSection';

import BottomSheet from '../../components/BottomSheet';

import i18n from './i18n.json';
import PlayerPreset from '../PlayerPreset';
import PrizePreset from '../PrizePreset';

import styles from './Home.module.scss';
import scssVars from '../../styles/variables.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectors as settingSelectors,
  actions as settingActions,
} from '../../store/slices/setting';
import { useNavigate } from 'react-router-dom';
import { langSelectors } from '../../store/slices/lang';

function Home() {
  const [players, setPlayers] = useState([]);
  const [prizes, setPrizes] = useState([]);

  const [playerPresetVisible, setPlayerPresetVisible] = useState(false);
  const [prizePresetVisible, setPrizePresetVisible] = useState(false);

  const lang = useSelector(langSelectors.currentLang);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlayerInput = (players) => {
    setPlayers(players);
  };
  const handlePrizeInput = (prizes) => {
    setPrizes(prizes);
  };

  const presetPlayers = useSelector(settingSelectors.player);
  const presetPrizes = useSelector(settingSelectors.prize);

  useEffect(() => {
    setPlayers(presetPlayers);
  }, [presetPlayers]);
  useEffect(() => {
    setPrizes(presetPrizes);
  }, [presetPrizes]);

  return (
    <>
      <main className={`page ${styles.home}`}>
        <div className={styles.playerSection}>
          <MultipleInputSection
            id='player-section'
            title={i18n.player[lang]}
            headerBackgroundColor={scssVars['accent-color-3']}
            headerBtnTitle={i18n.preset[lang]}
            headerBtnOnClick={() => setPlayerPresetVisible(true)}
            allowAdd
            onChange={handlePlayerInput}
            values={players}
          />
        </div>
        <div className={styles.prizeSection}>
          <MultipleInputSection
            id='prize-section'
            title={i18n.prize[lang]}
            headerBackgroundColor={scssVars['accent-color-2']}
            headerBtnTitle={i18n.preset[lang]}
            headerBtnOnClick={() => setPrizePresetVisible(true)}
            count={players.length}
            onChange={handlePrizeInput}
            values={prizes}
          />
        </div>
      </main>

      <MainFooter
        mainBtnTitle={i18n.footer.title[lang]}
        mainBtnOnClick={() => {
          navigate('/ladder');
        }}
        subBtnIcon={
          <MdOutlineRefresh size='1.6rem' color={scssVars['primary-color']} />
        }
        subBtnOnClick={() => dispatch(settingActions.reset())}
        count={Object.keys(players).length}
        showCount={true}
        disabled={
          Object.values(players).length === 0 ||
          Object.values(players).includes('') ||
          Object.values(prizes).includes('')
        }
      />

      {playerPresetVisible && (
        <BottomSheet onClose={() => setPlayerPresetVisible(false)}>
          <PlayerPreset />
        </BottomSheet>
      )}

      {prizePresetVisible && (
        <BottomSheet onClose={() => setPrizePresetVisible(false)}>
          <PrizePreset count={players.length} />
        </BottomSheet>
      )}
    </>
  );
}

export default Home;
