import Header from './components/Header';
import { MdSettingsApplications, MdOutlineRefresh } from 'react-icons/md';
import i18n from './i18n.json';
import MainFooter from './components/MainFooter';
import SequenceTextInput from './components/SequenceTextInput';
import './App.scss';
import SectionHeader from './components/SectionHeader';

function App() {
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
        <SectionHeader title={i18n.player['ko']} btnTitle={i18n.preset['ko']} />
        <SequenceTextInput />
        <SequenceTextInput sequence={1} />
        <SequenceTextInput />
        <SectionHeader title={i18n.prize['ko']} btnTitle={i18n.preset['ko']} />
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
