

import DropDown from "./Charts/DropDown";
import { Modal } from "antd";
import { Fragment, useState } from "react";
import Icon from "../Icon";
import FormComponent from "./Form/FormComponent";

function GenerateReport(props) {
    const { config } = props
    const [showModal, setShowModal] = useState(false)
    const modalHandler = () => {
        setShowModal(!showModal)
    }
    return (
       <Fragment>
            <button className="generate-report-button" onClick={modalHandler} button-type="primary"> 
                <Icon type="download"  width={12} height={12}/> 
                {config.display}
            </button>
            <Modal 
                title={"Generate Report"} 
                visible={showModal} 
                onOk={()=> setShowModal()} 
                okText="Generate Report"
                onCancel={() =>  setShowModal()} 
                cancelButtonProps={{display:"none",style:{display:"none"}}} 
                className="generate-report-modal"
                class="generate-report-modal"
            >
            <div>
            {config.form && <FormComponent config={config.form ||{}} />}
            </div>
        </Modal>
       </Fragment>
    )
    
}
export default GenerateReport;