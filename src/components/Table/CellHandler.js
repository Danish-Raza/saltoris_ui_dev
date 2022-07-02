import Utils from "../../Utils";
import _ from "underscore"
import { Space, Table, Tag } from 'antd';
import moment from "moment";

function cellHandler(config, data, helperFuntion) {
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
                {text}
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
                } else {
                    return text
                }
            }
            columns.push(obj)
        }
    })
    return columns
}
export default cellHandler;