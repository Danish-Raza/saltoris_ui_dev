import Utils from "../../Utils";
import _ from "underscore"
import { Space, Table, Tag,  InputNumber, DatePicker } from 'antd';
import moment from "moment";
import TableModal from "./TableModal";

function cellHandler(config, data, helperFuntion, editableTableData={}) {
    // const { config } = props;
    let columns = []
    let columnsOrder = config._order
    if(config.check_conditions && data) {
        let result = Utils.returnSuccessfullObject(config.check_conditions, data)
        if(result && result._order) {
            columnsOrder = result._order
        }
    }

    let sortedOrder = _.keys(Utils.sortOrder(columnsOrder))
    _.map(sortedOrder, order => {
        let column = config[order];
        let color = column.color;
        let colorMapping = column.color_mapping|| {};
        let isCurrency = column.is_currency;
        let isPercent = column.is_percent;
        
        let obj = {
            title: column.display,
            dataIndex: order,
            type: column.type,
            key: order,
            align: column.align,
            color:  color,
            width: column.width,
            sorter: column.sort ? (a, b) => a.name.length - b.name.length : false,
            filters: column.filters || null,
            onFilter: (value, record) => record[order].indexOf(value) === 0
        }

        if(column.type == "string") {
            obj.render = text => 
            <div className="cell" style={{color: color}}>
                {isCurrency ? isCurrency : ""}
                {isPercent ? isPercent : ""}
                {typeof text == "number" ? Utils.numberWithCommas(text) : text}
            </div>
            columns.push(obj)
        } else if(column.type == "date") {
            obj.render = text =>  <div className="cell" style={{color: color}}>{moment(text).format(column.format)}</div>
            columns.push(obj)
        } else if(column.type == "tag") {
            obj.render = (text) => (
                <Tag color={colorMapping[text]} key={text}>
                    <div className="cell" style={{color: color}}> {text}</div>
                </Tag>
            )
            columns.push(obj)
        } else if(column.type == "link") {
            obj.render = (text) => <a>{text}</a>
            columns.push(obj)
        } else if(column.type == "action") {
            obj.render = (text, rec) => {
                if(column.on_click == "overlay") {
                    return  (
                        <div 
                            data-action={column.on_click}
                            data-template={column.template||"default_template"}
                            onClick={()=> helperFuntion.setOverlay({show: true, overlay: column.overlay, dependentData: rec})}
                         >
                            {column.button_label}
                         </div>
                    )
                } if(column.on_click == "modal") {
                    return  (
                        <TableModal 
                            config={column.modal}
                            dependentData={rec}
                            displayText = {column.button_label}
                        />
                    )
                } else {
                    return text
                }
            }
            columns.push(obj)
        } else if(column.type == "editable") {
            obj.render = (value,  r) => {
                if(typeof value == "number") {
                    let val = editableTableData[obj.dataIndex] &&  editableTableData[obj.dataIndex][r.key] ?  editableTableData[obj.dataIndex][r.key] : value
                    return (
                        <InputNumber 
                            min={1} value={val}
                            onChange={(v)=>{
                                let modValue = {...editableTableData}
                                if(modValue[obj.dataIndex]) {
                                    modValue[obj.dataIndex][r.key]=v
                                } else {
                                    modValue[obj.dataIndex] = {}
                                    modValue[obj.dataIndex][r.key]=v
                                }
                               
                                helperFuntion.setEditableTableData(modValue)
                            }}
                        />
                    )
                } else if(moment(value).isValid()) {
                    let val = editableTableData[obj.dataIndex] && editableTableData[obj.dataIndex][r.key] ? editableTableData[obj.dataIndex][r.key] : value
                    return (
                        <DatePicker 
                            value={moment(val)}
                            getPopupContainer={triggerNode => triggerNode.parentNode} 
                            onChange={(v) => {
                                let modDate = {...editableTableData}
                                if(modDate[obj.dataIndex]){
                                    modDate[obj.dataIndex][r.key]=v.format(v._f)
                                } else {
                                    modDate[obj.dataIndex]={}
                                    modDate[obj.dataIndex][r.key]=v.format(v._f)
                                }
                               
                                helperFuntion.setEditableTableData(modDate)
                            }}  
                        />
                    )
                }
            }
            columns.push(obj)
        } else if(column.type == "tax") {
            obj.render = (value, r)  => {
                let quant = editableTableData["quantity"] && editableTableData["quantity"][r.key] ? editableTableData["quantity"][r.key] : r.quantity
                return <div>{(quant * r.tax)}</div>
            }
            columns.push(obj)
        } else if(column.type == "total") {
            obj.render = (value, r)  => {
                let quant = editableTableData["quantity"] && editableTableData["quantity"][r.key] ? editableTableData["quantity"][r.key] : r.quantity
                let unitPrice =  r.unit_price
                return <div>{(quant * unitPrice) +(quant*r.tax)}</div>
            }
            columns.push(obj)
        }
    })

    return columns
}
export default cellHandler;