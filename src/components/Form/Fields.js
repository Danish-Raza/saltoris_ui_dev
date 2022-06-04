import React from 'react';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


function Fields(props) {
    const { config,  onChange, onSearch, onSelect, onMultiSelect, onDateSelect, onSubmit, validated } = props;
    let fieldToRender=<div>Field</div>
    switch (config.type) {
        case "text":
            fieldToRender =  (
                <div className='field' data-validated={validated} type={config.type} style={{display: config.flex ? "flex" : "block", width: config.width || "100%"}}>
                    <div className='field-lable'>{config.label}</div>
                    <Input key={config.key} value={config.value} placeholder={config.placeholder} prefix={config.icon} onChange={(e) => onChange(config.key, e)}/>
                </div>
            )
            break;
        case "password":
            fieldToRender = (
                <div className='field' data-validated={validated} type={config.type} style={{display: config.flex ? "flex" : "block", width: config.width || "100%"}}>
                    <div className='field-lable'>{config.label}</div>
                    <Input.Password  key={config.key} value={config.value} placeholder={config.placeholder} prefix={config.icon} onChange={(e) => onChange(config.key, e)} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>
            ) 
            break;
        case "button":
            fieldToRender = (
                <div className='field' type={config.type}>
                    <button button-type={config.button_type} onClick={() => onSubmit(config)}>{config.display}</button>
                </div>
            ) 
            break;
        default:
            break;
    }
    return (
        fieldToRender
    )
}
export default Fields