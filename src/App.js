import Header from './components/Header';
import { MdSettingsApplications, MdOutlineRefresh } from 'react-icons/md';
import i18n from './i18n.json';
import MainFooter from './components/MainFooter';
import SequenceTextInput from './components/SequenceTextInput';
import './App.scss';

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
        <SequenceTextInput />
        <SequenceTextInput sequence={1} />
        <SequenceTextInput />
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
