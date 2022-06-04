

import { useDispatch } from "react-redux";
import { logout } from "../actions/appActions";

function Layout(props={}) {
    const dispatch = useDispatch();
    const submitHandler = () => {
        dispatch(logout())
      }
  return (
    <div className="App">
    <div>Application</div>
    <button onClick={submitHandler}>Logout</button>
    </div>
  );
}

export default Layout;
