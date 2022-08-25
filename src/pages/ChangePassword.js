import { useDispatch } from "react-redux";
import { login } from "../actions/appActions";
import FormComponent from "../components/Form/FormComponent";
import { Fragment, useRef, useState } from "react";
import Icon from "../Icon";

function ChangePassword(props={}) {
  let error = '' 
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("login")
  const recaptchaRef = useRef();

  const loginHandler = (data) => {
    dispatch(login({...data} ))
  }

  const registerHandler = (data) => {
    if (recaptchaRef && recaptchaRef.current && recaptchaRef.current.reset) {
      recaptchaRef.current.reset()
    }
    setActiveTab("register-2")
  }

  const signUpHandler = (data) => {
  
  }

  const loginFormConfig = [
    {
        type: "password",
        placeholder:"New Password",
        icon: <Icon type="password" height={16} width={16}/>,
        width:"100%",
        key: "password",
        required: true,
    },
    {
        type: "password",
        placeholder:"Confirm New Password",
        icon: <Icon type="password" height={16} width={16}/>,
        width:"100%",
        key: "confirm_password",
        required: true
    },
    {
        type: "button",
        onClick: "post",
        api: "",
        display: "Submit",
        button_type:"primary"
    }
  ]
  
  const tabHandler = (tab) => {
    error = null
    if (recaptchaRef && recaptchaRef.current && recaptchaRef.current.reset) {
      recaptchaRef.current.reset()
    }
    setActiveTab(tab)
  }

  let message = ""
//   if(authLoading) {
//     message = <div>Please wait</div>
//   } else if(error) {
//     message = <div>{errorMessage}</div>
//   }

  return (
    <div className="Login-page">
      <div className="tabs">
         <div className="saltoris-logo" data-account-type={process && process.env && process.env.REACT_APP_ACCOUNT_TYPE ? process.env.REACT_APP_ACCOUNT_TYPE : false}></div>
         <div style={{display:"flex"}}>
            <a className="tab" data-active={true} href={process.env.PUBLIC_URL}>Login</a>
         </div>
      </div>
      <div className="network-background">
        <div className="centered-text">
          <div>Embark on your collaborative Journey</div>
          <div>A unified platform to collaborate with your customers and explore new possibilities</div>
        </div>
      </div>
      {
        activeTab === "login" && (
          <FormComponent
            config={loginFormConfig}
            onSubmit={loginHandler}
            title={["Change Password"]}
            width={"40%"}
            message={message}
            template={"login-form"}
            footer = {(
              <div className="join-network-wrapper">
                {/* <span>Join the ELIT Network</span> 
                <span className="seperator">|</span> 
                <span onClick={() => taabHandler("register-1")}>Register Here</span> */}
              </div>
            )}
          />
        )
      }
    </div>
  );
}

export default ChangePassword;