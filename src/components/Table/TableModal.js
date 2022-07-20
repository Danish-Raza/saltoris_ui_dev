import { Button, Modal } from 'antd';
import React, { useState } from 'react';

function TableModal(props) {
    const {config, dependentData, displayText} = props;
    const [modalVisible, setModalVisible] = useState(false);

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
            >
               <div>

               </div>
            </Modal>
        </div>
    )
}

export default TableModal