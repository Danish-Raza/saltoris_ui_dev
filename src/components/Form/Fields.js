import React, { useRef, useState } from 'react';
import { Button, Input,Checkbox, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';



function Fields(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [modalData, setModalData] = useState({display: false, src: null, fileType:[], width: null, height: null});
    const { config,  onChange, onSearch, onSelect, onMultiSelect, onDateSelect, onSubmit, validated, onFocus, fileHandler } = props;
    let fieldToRender=<div>Field</div>
    let inputField = useRef()

    const convertURIToImageData = (URI) => {
        return new Promise(function(resolve, reject) {
          if (URI == null) return reject();
          var canvas = document.createElement('canvas'),
              context = canvas.getContext('2d'),
              image = new Image();
          image.addEventListener('load', function() {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(context.getImageData(0, 0, canvas.width, canvas.height));
          }, false);
          image.src = URI;
          return image
        });
    }

    const modalHandler = (value) => {
        var ext = value.name ? value.name.split('.') : []

        let obj = {...modalData,
            display: true, 
            src: URL.createObjectURL(value),
            width: ext.includes("pdf") == "pdf" ? "400px" : "100%",
            height: ext.includes("pdf") ? "650px" : "auto",
            fileType: ext,
            fileName: value.name 
        }
        setModalData(obj)
    }
     
    switch (config.type) {
        case "text":
            fieldToRender =  (
                <div className='field' data-validated={validated} type={config.type} style={{display: config.flex ? "flex" : "block", width: config.width || "100%"}}>
                    <div className='field-lable'>{config.label}</div>
                    <Input disabled={config.disabled} key={config.key} value={config.value} placeholder={config.placeholder} prefix={config.icon} onChange={(e) => onChange(config.key, e)}/>
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
        case "file":
           // let value = new FormData();
		    // value.append('file', config.value);'
            let dataUrl = ""
            if(config.value) {
                var fileToLoad = config.value;
                var fileReader = new FileReader();
                var base64;
                fileReader.onload = function(fileLoadedEvent) {
                    dataUrl = fileLoadedEvent.target.result;
                };

            }
           
            fieldToRender = (
                <div className='field' data-validated={validated} type={config.type} style={{display: config.flex ? "flex" : "block", width: config.width || "100%"}}>
                    <div className='field-lable'>{config.label}</div>
                    <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                        <div style={{display:"flex"}}>
                            <Checkbox checked={config.value ? true : false}>{config.checkbox_label}</Checkbox>
                            <input accept="image/png, image/jpeg, application/pdf" style={{display:"none"}} type={"file"} onChange={(info) => fileHandler(config.key, inputField)} ref={inputField}  />
                            <Button type='primary' onClick={() => inputField.current.click()} style={{borderRadius: 8, background:"#3B6BFD"}}>{config.placeholder}</Button>
                            <div className='selected-file-name'>{config.value ?config.value.name : null}</div>
                        </div>
                        <div>
                            <button button-type="ghost" onClick={() => modalHandler(config.value)}>View Document</button>
                        </div>

                    </div>
                    
                    <Modal title={modalData.fileName} visible={modalData.display} onOk={()=> setModalData({ display: false, src: null})} onCancel={() =>  setModalData({display: false, src: null})} cancelButtonProps={{display:"none",style:{display:"none"}}} width={560}  style={{ top: 10 }} >
                     {modalData.fileType && modalData.fileType.includes("pdf") ? ( 
                        <embed
                            src={modalData.src}
                            width="500px"
                            height="680px">
                        </embed>
                    ): <img src={modalData.src} style={{width: modalData.width , height: modalData.height}}/>}
                  </Modal>
                </div>
            )
            break;
        case "button":
            fieldToRender = (
                <div className='field' type={config.type} >
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