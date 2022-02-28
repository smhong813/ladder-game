import React, { useState } from 'react';
import Header from './components/Header';
import { MdSettingsApplications, MdOutlineRefresh } from 'react-icons/md';
import i18n from './i18n.json';
import MainFooter from './components/MainFooter';
import MultipleInputSection from './components/MultipleInputSection';
import './App.scss';

function App() {
  const [players, setPlayers] = useState({});
  const [prizes, setPrizes] = useState({});

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
        btnOnClick={() => {}}
      />
      <main className='page'>
        <MultipleInputSection
          id='player-section'
          title={i18n.player['ko']}
          headerBtnTitle={i18n.preset['ko']}
          allowAdd
          onChange={handlePlayerInput}
        />

        <MultipleInputSection
          id='prize-section'
          title={i18n.prize['ko']}
          headerBtnTitle={i18n.preset['ko']}
          count={(Object.keys(players) || []).length}
          onChange={handlePrizeInput}
        />
      </main>
      <MainFooter
        mainBtnTitle={i18n.footer.title['ko']}
        mainBtnOnClick={() => {}}
        subBtnIcon={<MdOutlineRefresh size='1.6rem' color='#ff3d68' />}
        subBtnOnClick={() => {}}
        count={1}
        showCount={true}
      />
    </>
  );
}

export default App;
