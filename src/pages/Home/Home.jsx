import React, { useState } from 'react';
import { MdSettingsApplications, MdOutlineRefresh } from 'react-icons/md';

import Header from '../../components/Header';
import MainFooter from '../../components/MainFooter';
import MultipleInputSection from '../../components/MultipleInputSection';

import BottomSheet from '../../components/BottomSheet';
import SettingPopup from '../../pages/SettingPopup';

import i18n from './i18n.json';
import PlayerPreset from '../PlayerPreset';
import PrizePreset from '../PrizePreset';

function Home() {
  const [players, setPlayers] = useState({});
  const [prizes, setPrizes] = useState({});

  const [settingVisible, setSettingVisible] = useState(false);
  const [playerPresetVisible, setPlayerPresetVisible] = useState(false);
  const [prizePresetVisible, setPrizePresetVisible] = useState(false);

  const handlePlayerInput = (players) => {
    // console.log(players);
    setPlayers(players);
  };
  const handlePrizeInput = (prizes) => {
    // console.log(prizes);
    setPrizes(prizes);
  };

  return (
    <>
      {/* TODO: hardcoded 'ko' will be replaced with a value from language selector */}
      <Header
        title={i18n.header.title['ko']}
        description={i18n.header.description['ko']}
        btnIcon={<MdSettingsApplications size='1.6rem' />}
        btnOnClick={() => {
          setSettingVisible(true);
        }}
      />
      <main className='page'>
        <MultipleInputSection
          id='player-section'
          title={i18n.player['ko']}
          headerBtnTitle={i18n.preset['ko']}
          headerBtnOnClick={() => setPlayerPresetVisible(true)}
          allowAdd
          onChange={handlePlayerInput}
        />

        <MultipleInputSection
          id='prize-section'
          title={i18n.prize['ko']}
          headerBtnTitle={i18n.preset['ko']}
          headerBtnOnClick={() => setPrizePresetVisible(true)}
          count={(Object.keys(players) || []).length}
          onChange={handlePrizeInput}
        />

        {/* <Chip
          id='chip'
          title='Animal'
          description='Horse, Lion, Rabbit'
          onChange={(data) => console.log(data)}
          on={true}
        /> */}
      </main>

      <MainFooter
        mainBtnTitle={i18n.footer.title['ko']}
        mainBtnOnClick={() => {}}
        subBtnIcon={<MdOutlineRefresh size='1.6rem' color='#ff3d68' />}
        subBtnOnClick={() => {}}
        count={Object.keys(players).length}
        showCount={true}
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
          <PrizePreset />
        </BottomSheet>
      )}
    </>
  );
}

export default Home;
