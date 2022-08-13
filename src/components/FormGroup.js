import Utils from "../Utils";
import FormComponent from "./Form/FormComponent";
import _ from "underscore";
import Icon from "../Icon";
import { Fragment, useEffect, useRef, useState } from "react";
import Table from "./Table/Index";
import Information from "./Information";
import ReviewComponent from "./Review";
import Tab from "./Tabs";
import moment from "moment";

function FormGroup(props) {
    const [config, setConfig] = useState(props.config);
    const {submit, width, review} = config;
    const [isDisabled, setIsDisabled] = useState({});
    const [formData, setFormData] = useState({});
    const [reviewState, setReviewState] = useState(false)
    const sortOrder = _.keys(Utils.sortOrder(config._order));
    const [tabData, setTabData] = useState(null)
    const thisComponent = useRef()

    const reviewHandler = (event) => {
        event.preventDefault()
        if(validateForm()) {
            setReviewState(!reviewState)
            if(thisComponent && thisComponent.current){
                let overlay = document.querySelector(".overlay-content")
                if(overlay) {
                    overlay.scrollTop=0
                }
            }
            let combinedData = {}
            let temObj = getFormData()
            _.map(temObj, (valObj, key) => {
                combinedData = { ...combinedData, ...valObj}
            })
            if(config.pass_data_on_submit) {
                props.onSubmit({[props.id]: combinedData})
            }
        }
    }


    const validateForm = () => {
        return true
        let result = true;
        let data = {}
        let modConfig = { ...config }
        _.map(sortOrder, wrapperOrder => {
            if(config[wrapperOrder].type=="form" || !config[wrapperOrder].type){
                let components = _.keys(Utils.sortOrder(config[wrapperOrder]._order));
                _.map(components, rec => {
                    let r = config[wrapperOrder][rec]
                    if(r.type !== "button") {
                        modConfig = {
                            ...modConfig,
                            [wrapperOrder]: {
                                ...modConfig[wrapperOrder],
                                [rec]: {
                                    ...modConfig[wrapperOrder][rec],
                                    validated:(r.required) ? r.value !== undefined && r.value !== null && r.value !== "" ? true : false : true
                                }
                            }
                        }
                        data= {
                            ...data,
                            [r.key]:r.type == "date"? moment(r.value).format("YYYY-MM-DD"):r.value
                        }
                     if(result) {
                        result =  (r.required) ? r.value !== undefined && r.value !== null && r.value !== "" ? true : false : true
                     }
                    } else if(r.type  ===  "button") {
                        modConfig = {
                            ...modConfig,
                            [wrapperOrder]: {
                                ...modConfig[wrapperOrder],
                                [rec]: {
                                    ...modConfig[wrapperOrder][rec],
                                    validated: true
                                }
                            }
                        }
                    }
                })
            }
        })
        console.log(data)
        setConfig(modConfig) 
        return result;
    }


    const submitHandler = () => {
        if(validateForm()) {
            let combinedData = {}
            let temObj = getFormData()
            _.map(temObj, (valObj, key) => {
                combinedData = { ...combinedData, ...valObj}
            })
            if(config.pass_data_on_submit) {
                props.onSubmit({[props.id]: combinedData})
            }
            console.log("combinedData",combinedData)
        }
    }

    const mockData = {
       "form_1": {
            "company_name": "Company name",
            "other_name":"Other name",
            "elit_network_id": "Elit network id",
            "corporate_website": "Corporate website",
            "elit_public_profile": "Elit public profile",
            "description":"Description"
       },
       "form_2": {
            "address_1":"Address 1",
            "address_2": "Address 2",
            "country": "country",
            "state":"state",
            "district":"district",
            "city":"city",
            "zipcode":"zipcode"
       },
       "form_3": {
            "product_category":"Product category",
            "service_category":"Service category",
            "industry_type":"Industry type",
            "industry_vertical":"Industry vertical",
            "Keyword":"Keyword",
            // "tin_no": "https://www.clickdimensions.com/links/TestPDFfile.pdf",
            // "company_logo": "https://www.gstatic.com/webp/gallery/1.jpg"
       }
    }

    const getFormData = (_config=config) => {
        let data = {}
        _.map(sortOrder, order => {
            data[order]={}
            if(_config[order].type == "form" || !_config[order].type) {
                let components = _.keys(Utils.sortOrder(_config[order]._order));
                _.map(components, rec => {
                    if(_config[order][rec].type !== "button" && _config[order][rec].value !== undefined && _config[order][rec].value !== null && _config[order][rec].value !== ""  ) { 
                        data[order] = { ...data[order],  [rec]: _config[order][rec].value }
                    }
                 })
            }
        })
        return data
    }

    useEffect(() => {
        let isDisabled = {};
        let modConfig = { ...config }
        _.map(sortOrder, order => {
            if(!config[order].type || config[order].type=="form") {

                let components = _.keys(Utils.sortOrder(config[order]._order));
                _.map(components, rec => {
                    let r = config[order][rec]
                    if(r.type !== "button") {
                        modConfig = {
                            ...modConfig,
                            [order]: {
                                ...modConfig[order],
                                [rec]: {
                                    ...modConfig[order][rec],
                                    value: mockData[order] ? mockData[order][rec] : null
                                }
                            }
                        }
                    }
                 })
                isDisabled = {
                    ...isDisabled,
                    [order]: config[order].initial_disabled
                }
            }
        })
        setConfig(modConfig)
        setIsDisabled(isDisabled)
    },[])

    const changeHandler = (params) => {
        const { key, value, id } = params;
        let modConfig = { ...config }
        let components = _.keys(Utils.sortOrder(config[id]._order));
        _.map(components, rec => {
            if(rec == key) {
                modConfig = {
                    ...modConfig,
                    [id]: {
                        ...modConfig[id],
                        [rec]: {
                            ...modConfig[id][rec],
                            value: value,
                            validated: true
                        }
                    }
                }
            }
        })
        setConfig(modConfig)
       
        if(config.pass_data_on_change) {
            let combinedData = {}
            let temObj = getFormData(modConfig)
            _.map(temObj, (valObj, key) => {
                combinedData = { ...combinedData, ...valObj}
            })
            props.onSubmit({[props.id]: combinedData})
        }
    }

    const handleIsDisabled = (id) => {
        let obj = {...isDisabled}
        obj[id] = !obj[id]
        setIsDisabled(obj)
    }
    if(thisComponent && thisComponent.current){
        thisComponent.current.scrollTo(0, 0);
    }

    const orderHandler = (value) => {
        setTabData(value)
    }
    return (
        <Fragment>
            {      
                <div className="reivew-component-wrapper" ref={thisComponent} data-status={reviewState} >
                    {
                            <form className="form-group-wrapper"  onSubmit={submitHandler} style={{width: width || "100%" }} data-componentDontExist={props.componentDontExist}>
                        {
                            _.map(sortOrder, order => {
                                return (
                                    <div className="form-wrapper" style={{width: config[order].width || "100%",  ...config[order].group_style && (config[order].group_style)}}>
                                        {config[order].title !== undefined &&  (config[order].type == "form" || !config[order].type) &&
                                            <div className="form-wrapper-title" style={{marginBottom: config[order] && config[order]._order && _.isEmpty(config[order]._order) && 0}} >
                                                {config[order].title}
                                                {
                                                    config[order].initial_disabled && (
                                                        <div data-button-type="edit" onClick={() => handleIsDisabled(order)}>
                                                            <Icon type="edit" width={17} height={17}/> Edit
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        }
                                        {config[order] && config[order]._order && !_.isEmpty(config[order]._order) && (config[order].type == "form" || !config[order].type) && (
                                            <FormComponent
                                                config={{...config[order], title: null, on_change:true, width: "100%"}}
                                                preFilledData={mockData[order]}
                                                disabled={isDisabled[order] || reviewState}
                                                id={order}
                                                onChange={changeHandler}
                                                reviewState={reviewState}
                                            />
                                        )}
                                        {
                                            config[order].type == "table" && config[order].id  &&  config[order].id.includes("selected") && (
                                                <Table 
                                                    key={config[order].id}
                                                    id={config[order].id || order}
                                                    config={{...config[order],title: null}}
                                                    //  dependentData={{}}
                                                />
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                            </form>
                            
                    }
                    <div className="button-wrapper">
                    <button button-type={"ghost"} onClick={reviewHandler}>Go Back</button>
                    {submit && <button button-type={"primary"} onClick={(e) => {e.preventDefault()}}>Download as PDF</button>}
                    {submit && <button button-type={"primary"} onClick={(e) => {e.preventDefault(); submitHandler()}}>{submit.display}</button>}
                </div>
                </div>
                
            }
            <form className="form-group-wrapper"  onSubmit={submitHandler} style={{width: width || "100%" , ...(reviewState && {overflow:"hidden",height: 2000})}} data-componentDontExist={props.componentDontExist} >
    
    {
        _.map(sortOrder, order => {
            return (
                <div className="form-wrapper" style={{width: config[order].width || "100%",  ...config[order].group_style && (config[order].group_style)}}>
                    {config[order].title !== undefined &&
                        <div className="form-wrapper-title" style={{marginBottom: config[order] && config[order]._order && _.isEmpty(config[order]._order) && 0}} >
                            {config[order].title}
                            {
                                config[order].initial_disabled && (
                                    <div data-button-type="edit" onClick={() => handleIsDisabled(order)}>
                                        <Icon type="edit" width={17} height={17}/> Edit
                                    </div>
                                )
                            }
                        </div>
                    }
                    {config[order] && config[order]._order && !_.isEmpty(config[order]._order) && (config[order].type == "form" || !config[order].type) && (
                        <FormComponent
                            config={{...config[order], title: null, on_change:true, width: "100%"}}
                            preFilledData={mockData[order]}
                            disabled={isDisabled[order]}
                            id={order}
                            onChange={changeHandler}
                            reviewState={reviewState}
                        />
                    )}
                    {
                        config[order].type == "table" && (
                            <Table 
                                key={config[order].id}
                                id={config[order].id || order}
                                config={{...config[order],title: null}}
                                tabData={tabData}
                                tabs = {
                                    config[order].tabs && 
                                    <Tab {...{
                                        key: config[order].id,
                                        id: config[order].id || order,
                                        config: config[order].tabs,
                                       
                                    }} orderHandler={orderHandler}  activeTab={tabData ? tabData.tab  : null} />
                                }
                                //  dependentData={{}}
                            />
                        )
                    }
                    {
                        config[order].type == "info" && (
                            <div>
                                <Information 
                                key={config[order].id}
                                id={config[order].id || order}
                                config={{...config[order]}}
                                dependentData={{}}
                            />
                            </div>
                        )
                    }
                </div>
            )
        })
    }
    {review && (
        reviewState ? (
            <div className="button-wrapper">
                <button button-type={"ghost"} onClick={reviewHandler}>Go Back</button>
                {submit && <button button-type={"primary"} onClick={(e) => {e.preventDefault(); submitHandler()}}>{submit.display}</button>}
            </div>
            ) : (
                <button type="submit"  button-type={"primary"} onClick={reviewHandler}>Review</button>
            )
    )}
    {!review && submit && <button type="submit" button-type={"primary"} onClick={(e) => {e.preventDefault(); submitHandler()}}>{submit.display}</button>}
            </form>
        </Fragment>
       
    )
}
export default FormGroup