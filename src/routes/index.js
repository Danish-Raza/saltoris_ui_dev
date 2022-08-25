import { Route, Routes, useLocation } from "react-router-dom";
import SupplierLogin from "../pages/SupplierLogin";
import CustomerLogin from "../pages/CustomerLogin";
import BuyerLogin from "../pages/BuyerLogin";
import Layout from "../views/Layout";
import NoPage from "../pages/NoPage";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword"

export default function AppRoutes(props) {
    let loggedIn = props.appData ? props.appData.loggedIn : false
    let element = null
    let search = useLocation().search;
    let page = null;
    if(search) {
        page = new URLSearchParams(search).get('page');
    }
    if(loggedIn) {
        if(page && page == "change_password") {
            element = <ForgotPassword appData={props.appData}/>
        } else {
            element = <Layout />
        }
    } else if(!loggedIn) {
        if(process && process.env && process.env.REACT_APP_ACCOUNT_TYPE == "SUPPIER") {
            if(page && page == "change_password") {
                element = <ChangePassword appData={props.appData}/>
            } else {
                element = <SupplierLogin appData={props.appData}/>
            }
        } else if(process && process.env && process.env.REACT_APP_ACCOUNT_TYPE == "BUYER") {
            if(page && page == "change_password") {
                element = <ChangePassword appData={props.appData}/>
            } else {
                element = <BuyerLogin appData={props.appData}/>
            }
        }  else if(process && process.env && process.env.REACT_APP_ACCOUNT_TYPE == "CUSTOMER") {
           
            if(page && page == "change_password") {
                element = <ChangePassword appData={props.appData}/>
            } else {
                element = <CustomerLogin appData={props.appData}/>
            }  
        }
    }
    return (
        <Routes>
            <Route exact path="/page-not-found" element={<NoPage />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={element}/>
         </Routes>
    );
  }