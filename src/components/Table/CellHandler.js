import Utils from "../../Utils";
import _ from "underscore"
import { Space, Table, Tag,  InputNumber, DatePicker } from 'antd';
import moment from "moment";
import TableModal from "./TableModal";
import Icon from "../../Icon";

function cellHandler(config, data, helperFuntion, editableTableData={}, allowEdit, parentColumn) {
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
        let columnType = allowEdit ? column.type : "string"
        
        let obj = {
            title: column.display,
            dataIndex: order,
            type: columnType,
            key: order,
            align: column.align,
            color:  color,
            width: column.width,
            sorter: column.sort ? (a, b) => a.name.length - b.name.length : false,
            filters: column.filters || null,
            onFilter: (value, record) => record[order].indexOf(value) === 0
        }

        if(columnType == "string") {
            obj.render = text => 
            <div className="cell" style={{color: color}}>
                {isCurrency ? isCurrency : ""}
                {isPercent ? isPercent : ""}
                {typeof text == "number" ? Utils.numberWithCommas(text) : text}
            </div>
            columns.push(obj)
        } else if(columnType == "date") {
            obj.render = text =>  <div className="cell" style={{color: color}}>{moment(text).format(column.format)}</div>
            columns.push(obj)
        } else if(columnType == "tag") {
            obj.render = (text) => (
                <Tag color={colorMapping[text]} key={text}>
                    <div className="cell" style={{color: color}}> {text}</div>
                </Tag>
            )
            columns.push(obj)
        } else if(columnType == "link") {
            obj.render = (text) => <a>{text}</a>
            columns.push(obj)
        } else if(columnType == "action") {
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
        } else if(columnType == "editable") {
            obj.render = (value,  r, rowIndex) => {
                if(typeof value == "number" || value == null) {
                    return (
                        <InputNumber 
                            min={1} value={value}
                            onChange={(v)=>{
                                helperFuntion.setEditableTableData({[obj.dataIndex]: v}, rowIndex, parentColumn)
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
                                helperFuntion.setEditableTableData({[obj.dataIndex]: v.format(v._f)}, rowIndex, parentColumn)
                            }}  
                        />
                    )
                }
            }
            columns.push(obj)
        } else if(columnType == "tax") {
            obj.render = (value, r)  => {
                let quant = editableTableData["quantity"] && editableTableData["quantity"][r.key] ? editableTableData["quantity"][r.key] : r.quantity
                return <div>{(r.quantity * r.tax)}</div>
            }
            columns.push(obj)
        } else if(columnType == "total") {
            obj.render = (value, r)  => {
                let quant = editableTableData["quantity"] && editableTableData["quantity"][r.key] ? editableTableData["quantity"][r.key] : r.quantity
                let unitPrice =  r.unit_price
                return <div>{(quant * unitPrice) +(quant*r.tax)}</div>
            }
            columns.push(obj)
        } else if(columnType == "switch-data") {
            obj.render = (value, record, ind)  => {
                let switchData = column.data_key
                let displayKey = column.display_key
                let curVersionIndex = record._curVersionIndex || 0;
                if(record[switchData]) {
                    return (
                        <div className="switch-column-wrapper">
                            <Icon 
                                type="arrow-left" 
                                prams={{disabled: curVersionIndex == 0 ? true: false}}  
                                width={20} height={20}
                                onClick={()  => helperFuntion.switchDataHandler("GO_BACK", ind, column)}
                            />
                                <div>{value}</div>
                            <Icon 
                                type="arrow-right" 
                                prams={{disabled: curVersionIndex == record[switchData].length-1 ? true : false}}  
                                width={20} height={20}
                                onClick={()  => helperFuntion.switchDataHandler("GO_FORTH",ind, column)}
                            />
                        </div>
                    )
                } else {
                    return (
                        <div>{value}</div>
                    )
                }
                
            }
            columns.push(obj)
        }
    })

    return columns
}
export default cellHandler;