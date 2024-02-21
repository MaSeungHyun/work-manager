import './App.css';
import Main from './Front/Main/Main';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div className="work-manager-frame">
      <RecoilRoot>
        <Main />
      </RecoilRoot>
    </div>
  );
}

export default App;
