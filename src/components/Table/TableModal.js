import { Button, Modal, Table ,Space, Tag } from 'antd';
import React, { useState } from 'react';

function TableModal(props) {
    const {config, dependentData, displayText, columnInfo} = props;
    const [modalVisible, setModalVisible] = useState(false)
    let {view_detail}  = columnInfo
    console.log("dependentData",dependentData, columnInfo)
    const columns = [
        {
            title: <div><div>Code/Description</div><div>HSN/SAC</div></div>,
            width: "33%",
            dataIndex: 'code',
            key: 'code',
            render: (text) => { return text ? text : "--"}
        },
        {
            title: 'Delivery Date',
            dataIndex: 'delivery_date',
            key: 'delivery_date',
            render: (text) => { return text ? text : "--"}
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text) => { return text ? text : "--"}
        },
        {
            title: 'UOM',
            dataIndex: 'uom',
            key: 'uom',
            render: (text) => { return text ? text : "--"}
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
            render: (text) => { return text ? text : "--"}
        },
        {
            title: 'Tax',
            dataIndex: 'tax',
            key: 'tax',
            render: (text) => { return text ? text : "--"}
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => { return text ? text : "--"}
        },
      ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        }
      ];
      
    return (
        <div>
            
            <Button type="primary" onClick={() => setModalVisible(true)} style={{borderRadius: 8, padding:"3px 6px 3px 6px", height:"unset"}}>
                {displayText}
            </Button>
            <Modal
                title={false}
                style={{ top: 20 }}
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                className="table-detail-modal"
                okText="Close"
                cancelButtonProps={{style:{"display": "none"}}}
                getContainer={() => { 
                    if(document.querySelector(".table-detail-modal")){
                        let all = document.querySelectorAll(".table-detail-modal")
                        for (let elm of all) {
                            elm.parentElement.style.zIndex=1002
                            let wrapper = elm.parentElement.parentElement.querySelector(".ant-modal-mask")
                            if(wrapper){
                                wrapper.style.zIndex=1002
                            }
                        }
                    }
                    return document.body
                }}
            >
                {
                    view_detail == "po_detail" && (
                        <div className='po-detailed-view'>

                        <div className='display-flex'>
                            <div className='width-9'>
                                <div className='company-logo'></div>
                            </div>
                            <div className='block width-90 m-left-14'>
                                <div className='display-flex'>
                                     <div className='section-title'>Registered Office:</div>
                                     <div className='section-value'></div>
                                </div>
                                <div className='display-flex'>
                                     <div className='section-title'>Factory Address:</div>
                                     <div className='section-value'></div>
                                </div>
     
                                 <div className='display-flex'>
                                     <div className='display-flex width-50'>
                                         <div className='section-title'>Phone:</div>
                                         <div className='section-value'></div>
                                     </div> 
                                     <div className='display-flex width-50'>
                                         <div className='section-title'>Fax:</div>
                                         <div className='section-value'></div>
                                     </div>
                                 </div>  
     
                                 <div className='display-flex'>
                                     <div className='display-flex width-50'>
                                         <div className='section-title'>PAN:</div>
                                         <div className='section-value'></div>
                                     </div> 
                                      <div className='display-flex width-50'>
                                         <div className='section-title'>CIN:</div>
                                         <div className='section-value'></div>
                                     </div>   
                                 </div>
     
                                 <div className='display-flex'>
                                     <div className='section-title'>GSTIN for:</div>
                                     <div className='section-value'></div>
                                </div>
     
                                <div className='display-flex'>
                                     <div className='section-title'>URL:</div>
                                     <div className='section-value'></div>
                                </div>
                            </div>
                        </div>
     
                        <div className='block-title'>Purchase Order</div>
     
                        <div className='display-flex'>    
                            <div className='width-50'>
                                 <div className='block width-100'>
                                     <div className='display-flex'>
                                         <div className='section-title'>Vendor Name:</div>
                                         <div className='section-value'></div>
                                     </div>
     
                                     <div className='display-flex'>
                                         <div className='section-title'>Vendor Code:</div>
                                         <div className='section-value'></div>
                                     </div>
     
                                     <div className='display-flex'>
                                         <div className='section-title'>Vendor Address:</div>
                                         <div className='section-value'></div>
                                     </div>
     
                                     <div className='display-flex'>
                                         <div className='section-title'>State:</div>
                                         <div className='section-value'></div>
                                     </div>
                                     <div className='display-flex'>
                                         <div className='section-title'>CIN:</div>
                                         <div className='section-value'></div>
                                     </div>
                                     <div className='display-flex'>
                                         <div className='display-flex width-50'>
                                             <div className='section-title'>PAN:</div>
                                             <div className='section-value'></div>
                                         </div> 
                                         <div className='display-flex width-50'>
                                             <div className='section-title'>GSTIN:</div>
                                             <div className='section-value'></div>
                                         </div> 
                                     </div>
                                     <div className='display-flex'>
                                         <div className='display-flex width-50'>
                                             <div className='section-title'>Contact Person:</div>
                                             <div className='section-value'></div>
                                         </div> 
                                         <div className='display-flex width-50'>
                                             <div className='section-title'>Tel No.:</div>
                                             <div className='section-value'></div>
                                         </div> 
                                     </div>
     
                                    
     
                                 </div>
                                 <div className='border'></div>
                                 <div className='display-flex width-100'>
                                     <div className='block width-50 no-border-top no-border-right'>
                                         <div className='display-flex'>
                                             <div className='section-title'>Shipping Address:</div>
                                             <div className='section-value'></div>
                                         </div>
                                         <div className='display-flex'>
                                             <div className='section-title'>State:</div>
                                             <div className='section-value'></div>
                                         </div>
                                         <div className='display-flex'>
                                             <div className='section-title'>PAN:</div>
                                             <div className='section-value'></div>
                                         </div>  
                                         <div className='display-flex'>
                                             <div className='section-title'>GSTIN:</div>
                                             <div className='section-value'></div>
                                         </div>  
                                     </div>
                                     <div className='block width-50 no-border-top'>
                                         <div className='display-flex'>
                                             <div className='section-title'>Billing Address:</div>
                                             <div className='section-value'></div>
                                         </div>
                                         <div className='display-flex'>
                                             <div className='section-title'>State:</div>
                                             <div className='section-value'></div>
                                         </div>
                                         <div className='display-flex'>
                                             <div className='section-title'>PAN:</div>
                                             <div className='section-value'></div>
                                         </div>  
                                         <div className='display-flex'>
                                             <div className='section-title'>GSTIN:</div>
                                             <div className='section-value'></div>
                                         </div>  
                                     </div>
                                 </div>
                            </div>
                            <div className='block width-50 no-border-left'>
                                <div className='width-100'>
                                     <div className='display-flex'>
                                         <div className='section-title'>Purchase Order No:</div>
                                         <div className='section-value'></div>
                                     </div>
                                     <div className='display-flex'>
                                         <div className='section-title'>PO Date:</div>
                                         <div className='section-value'></div>
                                     </div>
                                     <div className='display-flex'>
                                         <div className='section-title'>PO Version:</div>
                                         <div className='section-value'></div>
                                     </div>
                                     <div className='display-flex'>
                                         <div className='section-title'>PO Validity:</div>
                                         <div className='section-value'></div>
                                     </div>
                                </div>
                                <div className='width-100'>
                                     <div className='display-flex'>
                                         <div className='section-title'>PR No.:</div>
                                         <div className='section-value'></div>
                                     </div>
                                     <div className='display-flex'>
                                         <div className='section-title'>Ref. No. and Date:</div>
                                         <div className='section-value'></div>
                                     </div>
                                     <div className='display-flex'>
                                         <div className='section-title'>Recipient:</div>
                                         <div className='section-value'></div>
                                     </div>
                                     <div className='display-flex'>
                                         <div className='section-title'>Recipient's Email Id:</div>
                                         <div className='section-value'></div>
                                     </div>
     
                                     <div className='display-flex'>
                                         <div className='section-title'>Buyer name:</div>
                                         <div className='section-value'></div>
                                     </div>
                                     <div className='display-flex'>
                                         <div className='section-title'>Buyer's Email Id:</div>
                                         <div className='section-value'></div>
                                     </div>
                                </div>
                            </div>
                        </div>
     
                        <Table className='block no-border-top no-padding' columns={columns} dataSource={data} pagination={false}/>
     
                        <div className='block display-flex no-border-top'>
                            <div className='width-50'>
                            </div>
                            <div className='width-50'>
                                 <div className='display-flex justify-content-end'>
                                     <div className='section-title'>Net Ammount (in INR):</div>
                                     <div className='section-value'>0</div>
                                </div>
                                <div className='display-flex justify-content-end'>
                                     <div className='section-title'>IGST:</div>
                                     <div className='section-value'>-</div>
                                </div>
                                <div className='display-flex justify-content-end'>
                                     <div className='section-title'>Total Amount:</div>
                                     <div className='section-value'>0</div>
                                </div>
                            </div>
                        </div>
     
                        <div className='block display-flex  no-border-top'>
                            
                            <div className='width-50'>
                                 <div className='display-flex'>
                                     <div className='section-title'>Amount in Words (in INR):</div>
                                     <div className='section-value'></div>
                                </div>
                            </div>
                            <div className='width-50'>
                            </div>
                        </div>
     
                        <div className='block display-flex  no-border-top'>
                            
                            <div className='width-50'>
                                 <div className='display-flex'>
                                     <div className='section-title'>Incoterms:</div>
                                     <div className='section-value'></div>
                                </div>
                                <div className='display-flex'>
                                     <div className='section-title'>Payment Terms:</div>
                                     <div className='section-value'></div>
                                </div>
                                <div className='display-flex'>
                                     <div className='section-title'>Mode of Payment:</div>
                                     <div className='section-value'></div>
                                </div>
                            </div>
                            <div className='width-50'>
                            </div>
                        </div>
     
                        <div className='block display-flex  no-border-top'>
                            <div className='width-50'>
                                 <div className='display-flex'>
                                     <div>
                                         <div className='section-title'>Remark:</div>
                                         <div className='section-value'>
                                             Payment Terms -
                                         </div>
                                     </div>
                                </div>
                            </div>
                            <div className='width-50'>
                            </div>
                        </div>
                    </div>

                    )
                }
             
            </Modal>
        </div>
    )
}

export default TableModal