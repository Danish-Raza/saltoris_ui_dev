
import AppRoutes from './routes';
import 'antd/dist/antd.css';
import './styles/main.scss';
import { useSelector } from 'react-redux'
function App() {
  const appData = useSelector(state => state.appData)
  return (
    <AppRoutes appData={appData}/>
  );
}

export default App;
