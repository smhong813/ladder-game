import Header from './components/Header';
import { MdSettingsApplications } from 'react-icons/md';
import i18n from './i18n.json';

function App() {
  return (
    <div>
      {/* TODO: hardcoded 'ko' will be replaced with a value from language selector */}
      <Header
        title={i18n.header.title['ko']}
        description={i18n.header.description['ko']}
        btnIcon={<MdSettingsApplications size='1.6rem' />}
        btnOnClick={() => {}}
      />
    </div>
  );
}

export default App;
