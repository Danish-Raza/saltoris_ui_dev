import React, { Fragment, useRef, useState } from 'react';
import { Button, Input,Checkbox, Modal,DatePicker, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Icon from '../../Icon';
import _ from "underscore"
import Utils from '../../Utils';
import DropDown from '../Charts/DropDown';
const { TextArea } = Input;


function FieldWrapper(props) {
    const {validated, config} = props
    return (
        <div className='field' data-validated={validated} type={config.type} style={{display: config.flex ? "flex" : "block", width: config.width || "100%"}}>
            <div className='field-label'>
                {config.label_icon && <Icon type={config.label_icon} width={15} height={15}/>}
                {config.label}
            </div>
            {props.children}
            {config.fieldFooter}
        </div>
    )
}

function Fields(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [modalData, setModalData] = useState([]);
    const { config,  onChange, onSearch, onSelect, onMultiSelect, onDateSelect, onSubmit, validated, onFocus, fileHandler, removeValueHander } = props;
    let fieldToRender=<div>Field</div>
    let inputField = useRef()
    let multiInputField = useRef()

    const modalHandler = (values) => {
        let list = []
        _.map(values, value => {
            if(value){
                let filename = typeof value == "string" ?  value.replace(/^.*[\\\/]/, '') :value.name 
                let ext = typeof value == "string" ? value : value.name ? value.name.split('.') : []
                let obj = {
                    display: true, 
                    src: typeof value == "string" ? value : URL.createObjectURL(value),
                    width: ext.includes("pdf") || ext.includes(".pdf") ? "400px" : "-webkit-fill-available",
                    height: ext.includes("pdf") || ext.includes(".pdf") ? "650px" : "auto",
                    fileType:  ext.includes("pdf") || ext.includes(".pdf") ? ["pdf"] : "image",
                    fileName:  filename
                }
                list.push(obj)
            }
        })
        setModalData(list)
    }
     
    switch (config.type) {
        case "text":
            fieldToRender =  (
                <FieldWrapper config={config} validated={validated}>
                    <Input disabled={config.disabled} key={config.key} value={config.value} placeholder={config.placeholder} prefix={config.icon} onChange={(e) => onChange(config.key, e)}/>
                </FieldWrapper>
            )
            break;
        case "radio":
            let sortedOrder =  config.option ? _.keys(Utils.sortOrder(config.option._order)) : []
            fieldToRender =  (
                <FieldWrapper config={config} validated={validated}>
                    <Radio.Group disabled={config.disabled} key={config.key} value={config.value} onChange={(e) => onChange(config.key,e)}>
                        {
                            _.map(sortedOrder, order => <Radio value={order}>{config.option[order].display}</Radio> )
                        }
                    </Radio.Group>
                </FieldWrapper>
            )
            break;
        case "text-area":
            fieldToRender =  (
                <FieldWrapper config={config} validated={validated}>
                    <TextArea rows={4} disabled={config.disabled} key={config.key} value={config.value} placeholder={config.placeholder}  maxLength={6} prefix={config.icon} onChange={(e) => onChange(config.key, e)} />
                </FieldWrapper>
            )
            break;
        case "password":
            fieldToRender = (
                <FieldWrapper config={config} validated={validated}>
                     <Input.Password  key={config.key} value={config.value} placeholder={config.placeholder} prefix={config.icon} onChange={(e) => onChange(config.key, e)} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </FieldWrapper>
            ) 
            break;
        case "date":
                fieldToRender = (
                    <FieldWrapper config={config} validated={validated}>
                         <DatePicker disabled={config.disabled} key={config.key} value={config.value} onChange={(value) => onDateSelect(config.key, value) }/>
                    </FieldWrapper>
                )
                break;
        case "file":
            let acceptedFormat = "image/png, image/jpeg, application/pdf"
            if(config.file_type == "image") {
                acceptedFormat = "image/png, image/jpeg"
            }
            let modValues = config.value ? typeof config.value == "object" && config.value.length ? config.value : [config.value] : []
            fieldToRender = (
                <FieldWrapper config={config} validated={validated}>
                    <Fragment>
                        <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                            <div style={{display:"flex", alignItems:"center"}}>
                                {config.checkbox_label && <Checkbox  disabled={config.disabled} checked={config.value ? true : false}>{config.checkbox_label}</Checkbox>}
                                <input accept={acceptedFormat} style={{display:"none"}} type={"file"} onChange={(info) => fileHandler(config.key, inputField)} ref={inputField}  />
                                <input accept={acceptedFormat} style={{display:"none"}} type={"file"} onChange={(info) => fileHandler(config.key, multiInputField, "multiple")} ref={multiInputField}  />
                                {config.value && config.file_type == "image" &&
                                    _.map(modValues, value => {
                                        return (
                                            <div className='image-preview' disabled={config.disabled}  style={{background: typeof value == "string" ?`url(${value})` : `url(${URL.createObjectURL(value)})` }}></div>
                                        )
                                    })
                                }
                                    
                                <div>
                                    <Button type='primary' disabled={config.disabled} onClick={() => inputField.current.click()} style={{borderRadius: 8, background:config.disabled?null: "#3B6BFD"}}>{config.placeholder}</Button>
                                    <div className='field-extra-detail'>
                                        {config.file_format && <span>Format  ({config.file_format })</span>}
                                        {config.file_aspect_ratio && <span>Aspect Ratio  ({config.file_aspect_ratio})</span>}
                                        {config.file_size && <span>Size  ({config.file_size}kb)</span>}
                                    </div>
                                </div>
                                <div className='selected-file-name' disabled={config.disabled}> {
                                config.value ?
                                _.map(modValues, (value, index) => {
                                    let filename =  value ? (typeof value == "string" ? value.split('/').pop() : value.name ): null
                                    return(
                                        <div>
                                            <span style={{marginRight: 10}}>{filename}</span>
                                            <Icon type="delete" width={15} height={15} onClick={config.disabled ? ()=>{}: () => removeValueHander(config.key, index)}/>
                                        </div>
                                    )
                                })
                                : null}
                                </div>
                            </div>
                            {
                                config.no_view_document !== false && (
                                    <div style={{display:"flex"}}>
                                        <button button-type="ghost"  disabled={config.disabled}  onClick={() => modalHandler(modValues)} style={{minWidth: 135}}>View Document</button>
                                        {config.add_more && <Button type='primary' disabled={config.disabled} onClick={() => multiInputField.current.click()} style={{borderRadius: 8, background:config.disabled?null: "#3B6BFD", marginLeft: 10}}> <span style={{fontSize: 20, lineHeight:0, marginRight: 7}}>+</span> Add New Document</Button>}
                                    </div>
                                )
                            }
                        </div>
                    
                        <Modal title={"Selected files"} visible={modalData.length > 0 ? true : false} onOk={()=> setModalData([])} onCancel={() =>  setModalData([])} cancelButtonProps={{display:"none",style:{display:"none"}}} width={560 * modalData.length}  style={{ top: 10 }} >
                        {
                            _.map(modalData, rec => {
                                return (
                                    rec.fileType && rec.fileType.includes("pdf") ? (
                                        <div>
                                            <div style={{paddingLeft: 10}}>{rec.fileName}</div>
                                            <embed
                                                src={rec.src}
                                                width="500px"
                                                height="680px"
                                                style={{margin: 10}}
                                                title={rec.fileName}
                                            >
                                        </embed>
                                        </div>
                                    ): 
                                    <div className='modal-image' style={{background: `url(${rec.src})`, margin: 10 }}>
                                        <span >{rec.fileName}</span>
                                    </div>               
                                )
                            })
                        }
                        </Modal>
                    </Fragment>
                </FieldWrapper>
            )
            break;
        case "dropdown":
            fieldToRender =  (
                <FieldWrapper config={config} validated={validated}>
                        <DropDown value={config.value} config={config} onChange={onSelect} />
                </FieldWrapper>
            )
            break;
        case "button":
            fieldToRender = (
                <div className='field' type={config.type} >
                    <button  type="submit" button-type={config.button_type} onClick={(e) => {e.preventDefault(); onSubmit(config)}}>{config.display}</button>
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