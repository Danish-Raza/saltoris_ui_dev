import { useDispatch } from "react-redux";
import { login } from "../actions/appActions";
import FormComponent from "../components/Form/FormComponent";
import { Fragment, useRef, useState } from "react";
import Icon from "../Icon";
import _ from "underscore";
import WebUtils from "../WebUtils";
import { notification } from 'antd';


function SupplierLogin(props={}) {
  let {authLoading, error, errorMessage } = props.appData
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("login")
  const [fgMessage, setFgMessage] = useState(null)
  const [regData, setRegData] = useState({})
  const recaptchaRef = useRef();

  const loginHandler = (data) => {
    dispatch(login({...data} ))
  }

  const registerHandler = (data) => {
    if (recaptchaRef && recaptchaRef.current && recaptchaRef.current.reset) {
      recaptchaRef.current.reset()
    }
    setRegData(data)
    setActiveTab("register-2")
  }

  const signUpHandler = (data) => {
    console.log(data)
    let modData = {...regData, ...data}
    delete modData.confirm_password
    delete modData.term_condition
    delete modData.reaptcha
    let url = "https://9090-103-15-255-63.in.ngrok.io/api/v1/user/registration"
    WebUtils.httpOperations(url,modData,"POST").then(suc => {
      // console.log(suc)
      notification["success"]({
        message: 'Success',
        description:
          'Registration completed, you can now login',
      });
    }, error => error)
  }

  const loginFormConfig = [
    {
      type: "text",
      placeholder:"User Name",
      icon: <Icon type="user" height={16} width={16}/>,
      width:"100%",
      key: "username",
      required: true
    },
    {
      type: "password",
      placeholder:"Password",
      icon: <Icon type="password" height={16} width={16}/>,
      width:"100%",
      key: "password",
      required: true,
      fieldFooter: <div style={{display:"flex", justifyContent:"flex-end", width:"100%", marginTop: 15, fontSize:13 }}>
        <span style={{color:"red", cursor:"pointer"}} onClick={() => tabHandler("forgotPassword")}>Forgot Password</span></div>
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
      key: "companyName",
      required: true,
      icon: <Icon type="company" height={16} width={16}/>
    },
    {
      type: "text",
      placeholder:"CIN / PAN",
      width:"100%",
      key: "pan",
      required: true,
      icon: <Icon type="pan" height={16} width={16}/>
    },
    {
      type: "text",
      placeholder:"Address Line 1",
      width:"100%",
      key: "addressLine1",
      icon: <Icon type="address" height={16} width={16}/>
    },
    {
      type: "text",
      placeholder:"Address Line 2",
      width:"100%",
      key: "addressLine2",
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
      key: "pin",
      icon: <Icon type="zipcode" height={16} width={16}/>
    },
    {
      type: "text",
      placeholder:"Country",
      width:"49%",
      key: "country",
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
      key: "firstName",
      required: true
    },
    {
      type: "text",
      placeholder:"Second Name",
      icon: <Icon type="user" height={16} width={16}/>,
      width:"49%",
      key: "lastName",
      required: true
    },
    {
      type: "text",
      placeholder:"Landline",
      icon: <Icon type="phone" height={16} width={16}/>,
      width:"49%",
      key: "landline",
      required: true
    },
    {
      type: "text",
      placeholder:"Phone",
      icon: <Icon type="phone" height={16} width={16}/>,
      width:"49%",
      key: "phone",
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
      validate_password: true
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
      key: "businessRole"
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

  const forgotPasswordHandler = (data) => {
    let email = data.email
    let userList = [
      {  
          username:"John Doe",
          email:"supplier@mail.com",
          user_role: "admin",
          account_type: "supplier",
          config_name:"default_supplier"
      },
      {  
          username:"John Doe",
          email:"buyer@mail.com",
          user_role: "admin",
          account_type: "buyer",
          config_name:"default_buyer"
      },
      {
          username:"John Doe",
          email:"customer@mail.com",
          user_role: "admin",
          account_type: "customer",
          config_name:"default_customer",
          client_logo: "customer"
      }
    ]
    let userIndex = _.findIndex(userList, r => r.email == email)
    if(userIndex != -1) {
      setFgMessage(<div style={{color:"green", marginTop: 10, textAlign:"center", fontSize: 16}}>Email sent successfully to {email}.</div>)
    } else {
      setFgMessage(<div style={{color:"red",marginTop: 10, textAlign:"center", fontSize: 16}}>{email} does not exist in our database.</div>)
    }
  }
  
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

  const forgotPasswordConfig = [
    {
      type: "text",
      placeholder:"Email",
      icon: <Icon type="email" height={16} width={16}/>,
      width:"100%",
      key: "email",
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

  return (
    <div className="Login-page">
      <div className="tabs">
         <div className="saltoris-logo" data-account-type={process && process.env && process.env.REACT_APP_ACCOUNT_TYPE ? process.env.REACT_APP_ACCOUNT_TYPE : false}></div>
         <div style={{display:"flex"}}>
         <div className="tab" data-active={(activeTab === "register-1" || activeTab === "register-2")? true: false} onClick={() => tabHandler("register-1")}>Signup</div>
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
            title={["Supplier Login"]}
            width={"40%"}
            message={message}
            template={"login-form"}
            footer = {(
              <div className="join-network-wrapper">
                <span>Join the ELIT Network</span> 
                <span className="seperator">|</span> 
                <span onClick={() => tabHandler("register-1")}>Register Here</span>
              </div>
            )}
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
      {
          activeTab == "forgotPassword" && (
            <FormComponent
            config={forgotPasswordConfig}
            onSubmit={forgotPasswordHandler}
            title={["Enter your recovery email"]}
            width={"40%"}
            message={fgMessage}
            template={"login-form"}
            footer = {(
              <div className="join-network-wrapper">
                {/* <span>Join the ELIT Network</span> 
                <span className="seperator">|</span> 
                <span onClick={() => tabHandler("register-1")}>Register Here</span> */}
              </div>
            )}
          />
          )
        }
    </div>
  );
}

export default SupplierLogin;
