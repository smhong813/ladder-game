import React, { useState } from 'react';
import Header from './components/Header';
import { MdSettingsApplications, MdOutlineRefresh } from 'react-icons/md';
import i18n from './i18n.json';
import MainFooter from './components/MainFooter';
import MultipleInputSection from './components/MultipleInputSection';
import './App.scss';
import OptionSelect from './components/OptionSelect';
import OptionSelectItem from './components/OptionSelectItem';
import Divider from './components/Divider';

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
        <OptionSelectItem
          title='언어'
          name='language'
          options={[
            {
              id: 'ko',
              value: '한국어',
            },
            { id: 'en', value: '영어' },
          ]}
          onChange={(name, option) => console.log(name, option)}
        />
        <Divider className='divider' />
      </main>

      <MainFooter
        mainBtnTitle={i18n.footer.title['ko']}
        mainBtnOnClick={() => {}}
        subBtnIcon={<MdOutlineRefresh size='1.6rem' color='#ff3d68' />}
        subBtnOnClick={() => {}}
        count={Object.keys(players).length}
        showCount={true}
      />
    </>
  );
}

export default App;
