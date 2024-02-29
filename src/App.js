import './App.css';

import { RecoilRoot } from 'recoil';
import RouterComponent from './Front/RouterCompoent';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <div className="work-manager-frame">
      <CookiesProvider>
        <RecoilRoot>
          <RouterComponent />
        </RecoilRoot>
      </CookiesProvider>
    </div>
  );
}

export default App;
