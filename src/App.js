
import AppRoutes from './routes';
import 'antd/dist/antd.css';
import './styles/main.scss';
import { useSelector } from 'react-redux'
function App() {
  const authUser = useSelector(state => state.authUser)
  return (
    <AppRoutes authUser={authUser}/>
  );
}

export default App;
