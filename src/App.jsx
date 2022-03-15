import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MdSettings } from 'react-icons/md';

import Home from './pages/Home';
import Header from './components/Header';
import BottomSheet from './components/BottomSheet';
import SettingPopup from './pages/SettingPopup';

import i18n from './i18n.json';
import './App.scss';
import Ladder from './pages/Ladder';

function App() {
  const [settingVisible, setSettingVisible] = useState(false);

  return (
    <>
      <Header
        title={i18n.header.title['en']}
        description={i18n.header.description['en']}
        btnIcon={<MdSettings size='24px' />}
        btnOnClick={() => {
          setSettingVisible(true);
        }}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='ladder' element={<Ladder />} />
      </Routes>
      {settingVisible && (
        <BottomSheet onClose={() => setSettingVisible(false)}>
          <SettingPopup />
        </BottomSheet>
      )}
    </>
  );
}

export default App;
