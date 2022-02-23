import Header from './components/Header';
import { AiOutlineMore } from 'react-icons/ai';
import i18n from './i18n.json';

function App() {
  return (
    <div>
      {/* TODO: hardcoded 'ko' will be replaced with a value from language selector */}
      <Header
        title={i18n.header.title['ko']}
        description={i18n.header.description['ko']}
        btnIcon={<AiOutlineMore />}
        btnOnClick={() => {}}
      />
    </div>
  );
}

export default App;
