import './App.css';
import { RecoilRoot } from 'recoil';
import RouterComponent from './Front/RoutesCompoent';

function App() {
  return (
    <div className="work-manager-frame">
      <RecoilRoot>
        <RouterComponent />
      </RecoilRoot>
    </div>
  );
}

export default App;
