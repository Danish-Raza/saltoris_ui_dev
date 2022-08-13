import { Route, Routes } from "react-router-dom";
import SupplierLogin from "../pages/SupplierLogin";
import CustomerLogin from "../pages/CustomerLogin";
import BuyerLogin from "../pages/BuyerLogin";
import Layout from "../views/Layout";
import NoPage from "../pages/NoPage";

export default function AppRoutes(props) {
    let loggedIn = props.appData ? props.appData.loggedIn : false
    let element = null
    if(loggedIn) {
        element = <Layout />
    } else if(!loggedIn) {
        if(process && process.env && process.env.REACT_APP_ACCOUNT_TYPE == "SUPPIER") {
            element = <SupplierLogin appData={props.appData}/>
        } else if(process && process.env && process.env.REACT_APP_ACCOUNT_TYPE == "BUYER") {
            element = <BuyerLogin appData={props.appData}/>
        }  else if(process && process.env && process.env.REACT_APP_ACCOUNT_TYPE == "CUSTOMER") {
            element = <CustomerLogin appData={props.appData}/>
        }
    }
    return (
        <Routes>
            <Route exact path="/page-not-found" element={<NoPage />} />
            <Route path="*" element={element}/>
         </Routes>
    );
  }