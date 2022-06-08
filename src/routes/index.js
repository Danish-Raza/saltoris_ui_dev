import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../views/Layout";
import NoPage from "../pages/NoPage";

export default function AppRoutes(props) {
    let loggedIn = props.appData ? props.appData.loggedIn : false
    let element = null
    if(loggedIn) {
        element = <Layout />
    } else if(!loggedIn) {
        element = <Login appData={props.appData}/>
    }
    return (
        <Routes>
            <Route exact path="/page-not-found" element={<NoPage />} />
            <Route path="*" element={element}/>
         </Routes>
    );
  }