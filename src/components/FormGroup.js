import Utils from "../Utils";
import FormComponent from "./Form/FormComponent";
import _ from "underscore";
import Icon from "../Icon";
import { useEffect, useState } from "react";

function FormGroup(props) {
    const { config } = props;
    const {submit, width} = config
    const [isDisabled, setIsDisabled] = useState({})
    const [formData, setFormData] = useState({})
    const sortOrder = _.keys(Utils.sortOrder(config._order))

    const submitHandler = () => {
        console.log(formData)
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

    const getData = () => {

    }

    useEffect(() => {
        let isDisabled = {};
        let defaultData = {}
        _.map(sortOrder, order => {
            if(mockData) {
                defaultData = {
                    ...defaultData,
                    ...mockData[order]
                }
            }
            isDisabled = {
                ...isDisabled,
                [order]: config[order].initial_disabled
            }
        })
        setFormData(defaultData)
        setIsDisabled(isDisabled)
    },[])

    const changeHandler = (params) => {
        const { key, value, id } = params;
        let obj = {...formData, [key]: value}
        setFormData(obj)
    }

    const handleIsDisabled = (id) => {
        let obj = {...isDisabled}
        obj[id] = !obj[id]
        setIsDisabled(obj)
    }

    return (
        <form className="form-group-wrapper" style={{width: width || "100%"}}>
            {
                _.map(sortOrder, order => {
                    return (
                        <div className="form-wrapper">
                            <div className="form-wrapper-title">
                                {config[order].title}
                                {
                                    config[order].initial_disabled && (
                                        <div data-button-type="edit" onClick={() => handleIsDisabled(order)}>
                                            <Icon type="edit" width={17} height={17}/> Edit
                                        </div>
                                    )
                                }
                            </div>
                            <FormComponent
                                config={{...config[order], title: null, on_change:true}}
                                preFilledData={mockData[order]}
                                disabled={isDisabled[order]}
                                id={order}
                                onChange={changeHandler}
                            />
                        </div>
                    )
                })
            }
            {submit && <button type="submit" button-type={"primary"} onClick={submitHandler}>{submit.display}</button>}
        </form>
    )
}
export default FormGroup