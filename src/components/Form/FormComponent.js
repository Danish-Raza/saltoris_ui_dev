import { notification } from "antd"
import { useEffect, useState } from "react"
import Fields from "./Fields"
import _ from "underscore"
import ReCAPTCHA from "react-google-recaptcha"

function FormComponent(props) {
    const { config, reset, title, recaptcha, template, width, message } = props;
    const [components, setComponents] = useState([])

    useEffect(()=>{
       setComponents(config)
    },[])

    const onChange = (key, e) => {
        let fieldIndex = _.findIndex(components, r => r.key === key)
        if(fieldIndex !== -1) {
            let modComponent = [...components]
            modComponent[fieldIndex].value = e.target.value
            modComponent[fieldIndex].validated = true
           setComponents(modComponent) 
        }
    }

    const onSearch = () => {
        
    }

    const onSelect = () => {

    }

    const onMultiSelect = () => {

    }

    const onDateSelect = () => {

    }

    const getData = () => {

    }

    const getFormData = () => {
        let formData = {}
        _.map(components, r => {
            if(r.type !== "button") {
                formData = {...formData, [r.key]: r.value}
            }
        })
        return formData
    }

    const validateForm = () => {
        let modComponent = []
        let result = true
        _.map(components, r => {
           if(r.type !== "button") {
            modComponent.push({
                ...r,
                validated: (r.required) ? r.value !== undefined && r.value !== null && r.value !== "" ? true : false : true
            })
            if(result) {
                result =  (r.required) ? r.value !== undefined && r.value !== null && r.value !== "" ? true : false : true
            }
           } else  if(r.type  ===  "button") {
                modComponent.push({
                    ...r,
                    validated: true
                })
           }
        })
        setComponents(modComponent) 
        return result;
    }

    const onSubmit = (submitConfig) => {
        const {onSubmit} = props;
        let formValidated = validateForm()
        if(onSubmit && !submitConfig.api && formValidated) {
            let formData = getFormData()
            onSubmit(formData)
        } else {

        }
        console.log(components)
    }

    const onReset = () => {
        let modComponent = []
        _.map(components, r => {
            delete r.value
            modComponent.push(r) 
        })
        setComponents(modComponent) 
    }

    window.recaptchaCallback = () => {
        window.alert("checked")
    }

    return (

        <div className="form-component" data-template={template||"default-template"} style={{width: width || "100%"}}>
            <div className="form-title"> 
            {
                title && _.map(title, text => <div>{text}</div>)
            }
            </div>
            {
                _.map(components, component => {
                    return (
                        <Fields 
                            onChange={onChange}
                            onSelect={onSelect}
                            onMultiSelect={onMultiSelect}
                            onDateSelect={onDateSelect}
                            onSearch={onSearch}
                            config={component}
                            onSubmit={onSubmit}
                            validated={component.validated}
                        />
                    )
                })
            }
            {reset && <button onClick={onReset}>Reset</button>}
            {message}
            {/* {
                  <ReCAPTCHA
                  size= {recaptcha ? "normal": "compact"}
                  key={'register-1-r-1'}
                  sitekey="6LegpDogAAAAAMijU9n21oAwQ2kgb_nRfoYi7od-"
                  onChange={onreChange}
            />
            } */}

        </div>
    )
}
export default FormComponent;