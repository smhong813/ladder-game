import React, { useEffect, useState } from 'react';
import { MdSettings, MdOutlineRefresh } from 'react-icons/md';

import Header from '../../components/Header';
import MainFooter from '../../components/MainFooter';
import MultipleInputSection from '../../components/MultipleInputSection';

import BottomSheet from '../../components/BottomSheet';
import SettingPopup from '../../pages/SettingPopup';

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

function Home() {
  const [players, setPlayers] = useState([]);
  const [prizes, setPrizes] = useState([]);

  const [settingVisible, setSettingVisible] = useState(false);
  const [playerPresetVisible, setPlayerPresetVisible] = useState(false);
  const [prizePresetVisible, setPrizePresetVisible] = useState(false);

  const dispatch = useDispatch();

  const handlePlayerInput = (players) => {
    // console.log(players);
    setPlayers(players);
  };
  const handlePrizeInput = (prizes) => {
    // console.log(prizes);
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
      {/* TODO: hardcoded 'ko' will be replaced with a value from language selector */}
      <Header
        title={i18n.header.title['en']}
        description={i18n.header.description['en']}
        btnIcon={<MdSettings size='24px' />}
        btnOnClick={() => {
          setSettingVisible(true);
        }}
      />
      <main className={`page ${styles.home}`}>
        <div className={styles.playerSection}>
          <MultipleInputSection
            id='player-section'
            title={i18n.player['en']}
            headerBackgroundColor={scssVars['accent-color-3']}
            headerBtnTitle={i18n.preset['en']}
            headerBtnOnClick={() => setPlayerPresetVisible(true)}
            allowAdd
            onChange={handlePlayerInput}
            values={players}
          />
        </div>

        <MultipleInputSection
          id='prize-section'
          title={i18n.prize['en']}
          headerBackgroundColor={scssVars['accent-color-2']}
          headerBtnTitle={i18n.preset['en']}
          headerBtnOnClick={() => setPrizePresetVisible(true)}
          count={players.length}
          onChange={handlePrizeInput}
          values={prizes}
        />
      </main>

      <MainFooter
        mainBtnTitle={i18n.footer.title['en']}
        mainBtnOnClick={() => {}}
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

      {settingVisible && (
        <BottomSheet onClose={() => setSettingVisible(false)}>
          <SettingPopup />
        </BottomSheet>
      )}

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
