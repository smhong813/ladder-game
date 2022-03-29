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
import { langSelectors } from './store/slices/lang';
import { useSelector } from 'react-redux';

function App() {
  const [settingVisible, setSettingVisible] = useState(false);
  const lang = useSelector(langSelectors.currentLang);

  return (
    <>
      <Header
        title={i18n.header.title[lang]}
        description={i18n.header.description[lang]}
        btnIcon={<MdSettings size='24px' />}
        btnOnClick={() => {
          setSettingVisible(true);
        }}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/' element={<Ladder />} /> */}
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
