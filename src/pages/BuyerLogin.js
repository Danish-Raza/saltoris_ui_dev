import { useDispatch } from "react-redux";
import { login } from "../actions/appActions";
import FormComponent from "../components/Form/FormComponent";
import { Fragment, useRef, useState } from "react";
import Icon from "../Icon";

function Login(props={}) {
  let {authLoading, error, errorMessage } = props.appData
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
      type: "text",
      placeholder:"User Name",
      icon: <Icon type="user" height={16} width={16}/>,
      width:"100%",
      key: "email",
      required: true
    },
    {
      type: "password",
      placeholder:"Password",
      icon: <Icon type="password" height={16} width={16}/>,
      width:"100%",
      key: "password",
      required: true,
      fieldFooter: <div style={{display:"flex", justifyContent:"flex-end", width:"100%", marginTop: 15, fontSize:13 }}><span style={{color:"red"}}>Forgot Username</span> <span style={{margin:"0 5px 0 5px"}}>or</span> <span style={{color:"red"}}>Forgot Passowrd</span></div>
    },
    {
      type: "button",
      onClick: "post",
      api: "",
      display: "Login",
      button_type:"primary"
    }
  ]

  const registerFormConfig = [
    {
      type: "text",
      placeholder:"Company (legal) name",
      width:"100%",
      key: "company_name",
      required: true,
      icon: <Icon type="company" height={16} width={16}/>
    },
    {
      type: "text",
      placeholder:"CIN / PAN",
      width:"100%",
      key: "cin_pan",
      required: true,
      icon: <Icon type="pan" height={16} width={16}/>
    },
    {
      type: "text",
      placeholder:"Address Line 1",
      width:"100%",
      key: "address_1",
      icon: <Icon type="address" height={16} width={16}/>
    },
    {
      type: "text",
      placeholder:"Address Line 2",
      width:"100%",
      key: "address_2",
      icon: <Icon type="address" height={16} width={16}/>
    },
    {
      type: "text",
      placeholder:"City",
      width:"49.5%",
      key: "city",
      icon: <Icon type="city" height={16} width={16}/>
    },
    {
      type: "text",
      placeholder:"State",
      width:"49%",
      key: "state",
      icon: <Icon type="state" height={16} width={16}/>
    },
    {
      type: "text",
      placeholder:"Pin Code",
      width:"49.5%",
      key: "zipcode",
      icon: <Icon type="zipcode" height={16} width={16}/>
    },
    {
      type: "text",
      placeholder:"Country",
      width:"49%",
      key: "Country",
      icon: <Icon type="country" height={16} width={16}/>
    },
    {
      type: "button",
      onClick: "post",
      api: "",
      display: "Get Started",
      button_type:"primary"
    }
  ]

  const signUpFormConfig = [
    {
      type: "text",
      placeholder:"First Name",
      icon: <Icon type="user" height={16} width={16}/>,
      width:"49.5%",
      key: "first_name",
      required: true
    },
    {
      type: "text",
      placeholder:"Second Name",
      icon: <Icon type="user" height={16} width={16}/>,
      width:"49%",
      key: "second_name",
      required: true
    },
    {
      type: "text",
      placeholder:"Email",
      width:"100%",
      icon: <Icon type="email" height={16} width={16}/>,
      key: "email",
      required: true
    },
    {
      type: "password",
      placeholder:"Password",
      icon: <Icon type="password" height={16} width={16}/>,
      width:"49.5%",
      key: "password",
      required: true,
    },
    {
      type: "password",
      placeholder:"Confirm Password",
      icon: <Icon type="password" height={16} width={16}/>,
      width:"49%",
      key: "confirm_password",
      required: true
    },
    {
      type: "text",
      placeholder:"Business Role",
      width:"100%",
      icon: <Icon type="business" height={16} width={16}/>,      
      key: "business_role"
    },
    {
      type: "checkbox",
      placeholder:"Business Role",
      width:"100%",
      // icon: <Icon type="business" height={16} width={16}/>,      
      key: "term_condition",
      option:{
        _order: {
          "I hereby affirm to the Terms and Condition, Privacy Statement and Policy.": 1,
          "I hereby acknowledge that parts of my (company) information will be made accessible to other users on - boarded on the ELIT Network, based on my roles defined within the scope of the read and agreed - upon, Terms and Conditions, Privacy Statements and Policy.": 2,
          "Terms and Conditions, Privacy Policy and Statements are subject to change from time to time at the sole discretion of Saltoris Technologies Private Limited.": 3
        }
      },
      required: true,
      validation_rule:"select-all"
    },
    {
      type: "reaptcha",
      placeholder:"Business Role",
      width:"100%",
      // icon: <Icon type="business" height={16} width={16}/>,      
      key: "reaptcha",
      required: true
    },
    {
      type: "button",
      onClick: "post",
      api: "",
      display: "Register",
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
  if(authLoading) {
    message = <div>Please wait</div>
  } else if(error) {
    message = <div>{errorMessage}</div>
  }
  return (
    <div className="Login-page">
      <div className="tabs" >
         <div className="saltoris-logo" data-account-type={process && process.env && process.env.REACT_APP_ACCOUNT_TYPE ? process.env.REACT_APP_ACCOUNT_TYPE : false}></div>
         <div style={{display:"flex"}}>
         <div className="tab" data-active={activeTab === "login" ? true: false} onClick={() => tabHandler("login")}>Login</div>
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
            title={["Buyer Login"]}
            width={"40%"}
            message={message}
            template={"login-form"}
          />
        )
      }
      {
        (activeTab === "register-1" || activeTab === "register-2") && (
          <Fragment>
            <div className="register-tabs">
              <div className="register-tab" data-active={activeTab === "register-1" ? true: false}><span></span></div>
              <div className="register-tab" data-active={activeTab === "register-2" ? true: false}><span></span></div>
            </div>
            {
              activeTab === "register-1" && (
                <FormComponent
                  config={registerFormConfig}
                  title={["Step 1", "Enter Company Details"]}
                  onSubmit={registerHandler}
                  template={"login-form"}
                  recaptcha={true}
                  width={"40%"}
                />
              )
            }
            {
              activeTab === "register-2" && (
                <FormComponent
                  config={signUpFormConfig}
                  title={["Step 2", "Enter Company Administrator Details"]}
                  onSubmit={signUpHandler}
                  template={"login-form"}
                  width={"50%"}
                />
              )
            }
          </Fragment>
        )
      }
    </div>
  );
}

export default Login;
