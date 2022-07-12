import DropDown from "./Charts/DropDown";
import _ from "underscore"
import { useDispatch } from "react-redux";
import { changeConfig } from "../actions/appActions";
import { Button, Modal } from 'antd';
import { useState } from 'react';
import Icon from "../Icon";
import FormComponent from "./Form/FormComponent";

function Header(props) {
    const { config, isEditable, componentIndex, onChange=()=>{}, selectedOption, columnSelectorComponent,filterSelectorComponent, magnifiedContent } = props;
    const { title, dropdown, display } = config;
    const dispatch = useDispatch()
    const [searchBar, setSearchBar] = useState(false)
    let headerConfig = config.header_config;
    let widgetTitle = title || display;

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const toggleSearchBar = () => {
        setSearchBar(!searchBar)
    }

    if(headerConfig) {
        if(headerConfig.template == "dropdown-title" && selectedOption) {
            widgetTitle=''
            if(typeof selectedOption[dropdown.key] == "object" && selectedOption[dropdown.key].length) {
             
               _.map(selectedOption[dropdown.key], (o, i) => widgetTitle += (i != 0 ? " - " : "") + o)
            } else if(typeof selectedOption[dropdown.key] == "string") {
                widgetTitle = selectedOption[dropdown.key]
            }
           
        }
    }
    return (
        <div className="widget-header">
            <div className="widget-title">{widgetTitle}</div>
            {searchBar && <FormComponent config={config.searchConfig} />}
            <div style={{display:"flex", alignItems:"center"}}>
                {config.searchConfig && <Icon type="search" width={15} height={15} styles={{position:"relative", top: -2, marginRight: 9}} onClick={toggleSearchBar}/>}
                {config.type == "table" && filterSelectorComponent}
                {config.type == "table" && columnSelectorComponent}
                {magnifiedContent && <Icon type="zoomIn" width={20} height={20} onClick={showModal}/>}
                {config.download && <Icon type="cloud-download" width={20} height={20}/>}
                {dropdown !== undefined && <DropDown config={dropdown} onChange={onChange} styles={{marginLeft: 9}} />}
            </div>
            {isEditable  ? <div className="remove-button" onClick={()=> dispatch(changeConfig({action:"REMOVE_WIDGET", id:config.id}))}>-</div>:""}
            {isEditable && config.replicate && <div className="replicate-button" onClick={()=> dispatch(changeConfig({action:"REPLICATE_WIDGET",component: config, index: componentIndex})) }>+</div>}
            <Modal getContainer={() => document.body}   className="magnify-popup" style={{top: 20 }} title={false} visible={isModalVisible} onOk={handleOk} cancelButtonProps={{style: {display:"none"}}} okText={<Icon type="zoomOut" width={20} height={20} styles={{marginLeft:0, left: -2, top: 1}}/>} onCancel={handleCancel}>
               {magnifiedContent}
            </Modal>
        </div>
    )
}
export default Header;