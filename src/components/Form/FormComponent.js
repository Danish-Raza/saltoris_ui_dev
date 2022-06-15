import { notification } from "antd"
import { useEffect, useState } from "react"
import Fields from "./Fields"
import _ from "underscore"
import ReCAPTCHA from "react-google-recaptcha"
import Utils from "../../Utils"
import Icon from "../../Icon"
import { message as messageF } from 'antd';

function FormComponent(props) {
    const { config, reset, title, recaptcha, template, width, message, preFilledData, disabled, id } = props;
    const [components, setComponents] = useState([])
    const [formTitle, setTitle] = useState(title)

    useEffect(() => {
        if(config && config.length){
            setComponents(config)
        } else if(config && typeof config =="object" && !config.length) {
            let sortOrder = _.keys(Utils.sortOrder(config._order))
            let componentList = [];
            _.map(sortOrder, order => {
                componentList.push({
                    id: order,
                   ...config[order],
                   disabled: disabled,
                   value: preFilledData ? preFilledData[order]: null
                })
            })
            if(config.title) {
                if(typeof config.title == "object") {
                    setTitle(config.title)
                } else if(typeof config.title == "string") {
                    setTitle([config.title] )
                }
            } 
            setComponents(componentList)
        }
    },[disabled])

    const onChange = (key, e) => {
        const { on_change } = config;
        const { onChange, id } = props
        let fieldIndex = _.findIndex(components, r => r.key === key)
        if(fieldIndex !== -1) {
            let modComponent = [...components]
            modComponent[fieldIndex].value = e.target.value
            modComponent[fieldIndex].validated = true
           setComponents(modComponent)
           if(on_change && onChange) {
                onChange({key: key, value: modComponent[fieldIndex].value, id: id})
           }
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

    const onFocus = (component) => {

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

    const fileHandler = (key, info) => {
        console.log(info.current.files[0])
        messageF.success(`${info.current.files[0].name} file uploaded successfully`);
        // if (info.current.files[0].status !== 'uploading') {
        //     console.log(info.current.files[0], info.current.files[0].List);
        // }
        // if (info.current.files[0].status === 'done') {
        //     messageF.success(`${info.current.files[0].name} file uploaded successfully`);
        // } else if (info.current.files[0].status === 'error') {
        //     messageF.error(`${info.current.files[0].name} file upload failed.`);
        // }
        var fileToLoad = info.current.files[0];
        var fileReader = new FileReader();
        var base64;
        fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            console.log(base64);
        };
        // Convert data to base64
        ///fileReader.readAsDataURL(fileToLoad);
        const { on_change } = config;
        const { onChange, id } = props
        let fieldIndex = _.findIndex(components, r => r.key === key)
        if(fieldIndex !== -1) {
            let modComponent = [...components]
            modComponent[fieldIndex].value = info.current.files[0]
            modComponent[fieldIndex].validated = true
           setComponents(modComponent)
           if(on_change && onChange) {
                onChange({key: key, value: modComponent[fieldIndex].value, id: id})
           }
        }
    }

    return (

        <div className="form-component" data-template={template||"default-template"} style={{width: width || "100%"}}>
            {
                formTitle != undefined && (
                    <div className="form-title"> 
                    {
                        _.map(formTitle, text => <div>{text}</div>)
                    }
                   
                    <div>

                    </div>
                    </div>
                )
            }
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
                            onFocus={onFocus}
                            fileHandler={fileHandler}
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