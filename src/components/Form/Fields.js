import React, { Fragment, useRef, useState } from 'react';
import { Button, Input,Checkbox, Modal,DatePicker, Radio, Slider} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Icon from '../../Icon';
import _ from "underscore"
import Utils from '../../Utils';
import DropDown from '../Charts/DropDown';
import Reaptcha from 'reaptcha';
const { TextArea } = Input;
const { RangePicker } = DatePicker;

function FieldWrapper(props) {
    const {validated, config , minLabelWidth,  reviewState} = props
    return (
        <div data-reviewState={reviewState} className='field' data-key={config.key} data-validated={validated} type={config.type} data-template={config.template} style={{display: config.flex ? "flex" : "block", width: config.width || "100%"}}>
            {(config.label || config.label_icon) &&
                <div className='field-label' style={{...(minLabelWidth && {minWidth: minLabelWidth, maxWidth: minLabelWidth})}}>
                    {config.label_icon && <Icon type={config.label_icon} width={15} height={15}/>}
                    {config.label}
                </div>
            }
            {props.children}
            {config.fieldFooter}
        </div>
    )
}

function Fields(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [modalData, setModalData] = useState([]);
    const { config,  onChange, onSearch, onSelect, onMultiSelect, onDateSelect, onSubmit, validated, onFocus, fileHandler, removeValueHander, onreChange, onDateRangeSelect, onSliderChange,  minLabelWidth, reviewState } = props;
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
                <FieldWrapper config={config} validated={validated} minLabelWidth={minLabelWidth} reviewState={reviewState}>
                    <Input disabled={config.disabled} key={config.key} value={config.value} placeholder={config.placeholder} prefix={typeof config.icon == "string" ? <Icon type={config.icon} width={15} height={15} /> : config.icon } onChange={(e) => onChange(config.key, e)}/>
                </FieldWrapper>
            )
            break;
        case "radio":
            let sortedOrder =  config.option ? _.keys(Utils.sortOrder(config.option._order)) : []
            fieldToRender =  (
                <FieldWrapper config={config} validated={validated}  minLabelWidth={minLabelWidth}  reviewState={reviewState}>
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
                <FieldWrapper config={config} validated={validated}  minLabelWidth={minLabelWidth }  reviewState={reviewState}>
                    <TextArea rows={4} disabled={config.disabled} key={config.key} value={config.value} placeholder={config.placeholder}  maxLength={6} prefix={config.icon} onChange={(e) => onChange(config.key, e)} />
                </FieldWrapper>
            )
            break;
        case "password":
            fieldToRender = (
                <FieldWrapper config={config} validated={validated}  minLabelWidth={minLabelWidth}  reviewState={reviewState}>
                     <Input.Password  key={config.key} value={config.value} placeholder={config.placeholder} prefix={config.icon} onChange={(e) => onChange(config.key, e)} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </FieldWrapper>
            ) 
            break;
        case "date":
                fieldToRender = (
                    <FieldWrapper config={config} validated={validated} minLabelWidth={minLabelWidth} reviewState={reviewState}>
                         <DatePicker getPopupContainer={triggerNode => triggerNode.parentNode} disabled={config.disabled} key={config.key} value={config.value} onChange={(value) => onDateSelect(config.key, value) }/>
                    </FieldWrapper>
                )
                break;
        case "date-range":
            fieldToRender = (
                <FieldWrapper config={config} validated={validated}  minLabelWidth={minLabelWidth} reviewState={reviewState}> 
                    <RangePicker getPopupContainer={triggerNode => triggerNode.parentNode} disabled={config.disabled} key={config.key} value={config.value} onChange={(value, dateStrings) => onDateRangeSelect(config.key, value, dateStrings) } placeholder={["From","To"]}/> 
                </FieldWrapper>
            )
            break;
        case "slider":
            fieldToRender = (
                <FieldWrapper config={config} validated={validated}  minLabelWidth={minLabelWidth} reviewState={reviewState}> 
                    <Slider min={config.min} max={config.max} range disabled={config.disabled} key={config.key} value={config.value} onChange={(value) => onSliderChange(config.key, value) }/>
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
                <FieldWrapper config={config} validated={validated} minLabelWidth={minLabelWidth} reviewState={reviewState}>
                    <Fragment>
                        <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                            <div className='field-button-wrapper' style={{display:"flex", alignItems:"center", flexWrap:"wrap"}}>
                                {config.checkbox_label && <Checkbox  disabled={config.disabled} checked={config.value ? true : false}>{config.checkbox_label}</Checkbox>}
                                <input accept={acceptedFormat} style={{display:"none"}} type={"file"} onChange={(info) => fileHandler(config.key, inputField)} ref={inputField}  />
                                <input accept={acceptedFormat} style={{display:"none"}} type={"file"} onChange={(info) => fileHandler(config.key, multiInputField, "multiple")} ref={multiInputField}  />
                                {
                                    config.template && config.template.includes("box-preview") ? (
                                        config.value ?
                                        _.map(modValues, value => {
                                            return (
                                                <div key={value} className='image-preview' disabled={config.disabled}  style={{background: typeof value == "string" ?`url(${value})` : `url(${URL.createObjectURL(value)})` }}></div>
                                            )
                                        }) : (
                                            <div className='select-image-box' onClick={() => inputField.current.click()}> + </div>
                                        )           
                                    ) : (
                                        config.value && config.file_type == "image" &&
                                        _.map(modValues, value => {
                                            return (
                                                <div className='image-preview' disabled={config.disabled}  style={{background: typeof value == "string" ?`url(${value})` : `url(${URL.createObjectURL(value)})` }}></div>
                                            )
                                        })
                                    )
                                }
                                    
                                <div>
                                    {
                                        !config.template || (config.template && !config.template.includes("box-preview")) ? (
                                            <Fragment>
                                                <Button type='primary' disabled={config.disabled} onClick={() => inputField.current.click()} style={{borderRadius: 8, background:config.disabled?null: "#3B6BFD"}}>{config.placeholder}</Button>
                                                <div className='field-extra-detail'>
                                                    {config.file_format && <span>Format  ({config.file_format })</span>}
                                                    {config.file_aspect_ratio && <span>Aspect Ratio  ({config.file_aspect_ratio})</span>}
                                                    {config.file_size && <span>Size  ({config.file_size}kb)</span>}
                                                </div>
                                            </Fragment>
                                        ) : ""
                                    }
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
                                : config.template && config.template.includes("box-preview")? <div>{config.placeholder}</div>: null}
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
                <FieldWrapper config={config} validated={validated} minLabelWidth={minLabelWidth} reviewState={reviewState}>
                        <DropDown value={config.value} config={config} onChange={onSelect} />
                </FieldWrapper>
            )
            break;
        case "reaptcha":
            fieldToRender = (
                <FieldWrapper config={config} validated={validated} minLabelWidth={minLabelWidth} reviewState={reviewState}>
                     <Reaptcha
                        sitekey="6Ld5ppsgAAAAAOLM2Om-owkeHVZz48oez-zKNCqw"
                        onVerify={(value) => onreChange(config.key, value)}
                        action={"login"}
                    />
                </FieldWrapper>  
            )
            break;
            
        case "checkbox":
            const checkboxOptions = [];
            let sortedOptions =  config.option ? _.keys(Utils.sortOrder(config.option._order)) : []
            _.map(sortedOptions, o => {
                checkboxOptions.push(
                    { label: config.option[o] ? config.option[o].display: o, value: o},
                )
            })
            fieldToRender = (
                <FieldWrapper config={config} validated={validated} minLabelWidth={minLabelWidth} reviewState={reviewState}>
                        <Checkbox.Group options={checkboxOptions} onChange={(value) => onSelect(config.key, value)} />
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