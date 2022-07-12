import _ from "underscore"
import Utils from "../../Utils";
import Header from "../Header";
import { Space, Table, Tag, Popover, Button, Switch} from 'antd';
import cellHandler from "./CellHandler";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOverlay } from "../../actions/appActions";
import Icon from "../../Icon";
import FormComponent from "../Form/FormComponent";
import moment from "moment";


function TableComponent(props) {
    const { config, handleDrop, handleDrag, isEditable, componentIndex, dependentData, componentDontExist } = props;
    const { columns, width, sticky }  = config;
    const [selectedOption, setSelectedOption] = useState({});
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [curColumn, setCurColumn] = useState([])
    const [allColumn, setAllColumn] = useState([])
    const dispatch = useDispatch()
    const [fixedTop, setFixedTop] = useState(false);

    const sortHandler = () => {

    }
    const paginationHandler = () => {
        
    }

   useEffect(() => {
    let defaultDropdown = config.dropdown ? config.dropdown.default: null;
    let params = {}
    if(defaultDropdown) {
        let sortedOrder = _.keys(Utils.sortOrder(defaultDropdown._order))
        let dropdownKey = config.dropdown.key
        let mode = defaultDropdown.mode
        params = {
            [dropdownKey]: mode == "select" ? sortedOrder[0]: sortedOrder
        }
        setSelectedOption(params)
    }
    const _mockData = [
        {
          key: '1',
          name: 'Danish Raza',
          buyer: 'Danish Raza',
          value: 32,
          customer_id: "1100712",
          customer_name: "Danish Raza",
          po_id: "#4400000555",
          material: "material 1",
          order_ammount: '1,881,395.00',
          requirement:"Type I",
          due_date: "2022-10-09",
          valid_from: "2022-10-09",
          address: 'New York No. 1 Lake Park',
          status: 'Send',
          invoice_status:"Paid",
          invoice_no: "#123",
          title:"title 1",
          category: "category 1",
          certifying_body: "body 1",
          editor:"Editor 1",
          version:"Version 2",
          dol:"DOL 1",
          dop:"DOP 2",
          isbn:"ISBN 1",
          "ship_to":"Hyderabad",
          in_house_publication: "Publication 1",
          purchase_status:"Dispatched",
          po_status:"Received"
        },
        {
          key: '2',
          name: 'Akshay Pai',
          buyer: 'Akshay Pai',
          invoice_status:"Overdue",
          value: 42,
          valid_from: "2022-10-10",
          order_ammount: '311,520.00',
          requirement:"Type I",
          due_date: "2022-10-09",
          customer_id: "1700294",
          customer_name: "Akshay Pai",
          po_id: "#5500002705",
          material: "material 2",
          address: 'London No. 1 Lake Park',
          status: 'Payments',
          invoice_no: "#124",
          title:"title 2",
          category: "category 2",
          certifying_body: "body 2",
          editor:"Editor 2",
          version:"Version 2",
          dol:"DOL 2",
          dop:"DOP 2",
          isbn:"ISBN 2",
          in_house_publication: "Publication 2",
          purchase_status:"Received",
          "ship_to":"Agra",
          po_status:"Invoiced"
        }, 
        {
            key: '4',
            name: 'Mukesh Kumar',
            buyer:"Mukesh Kumar",
            customer_id: "4300002632",
            customer_name: "Mukesh Kumar",
            invoice_Status:"Paid",
            po_id: "#4300002632",
            invoice_status:"Due",
            material: "material 4",
            valid_from: "2022-10-11",
            value: 32,
            order_ammount: '333,000.00',
            requirement:"Type I",
            due_date: "2022-10-09",
            address: 'Sidney No. 1 Lake Park',
            status: 'Rejected',
            invoice_no: "#126",
            title:"title 4",
            category: "category 4",
            certifying_body: "body 4",
            editor:"Editor 4",
            version:"Version 4",
            dol:"DOL 4",
            dop:"DOP 4",
            isbn:"ISBN 4",
            "ship_to":"Lucknow",
            in_house_publication: "Publication 4",
            purchase_status:"Received",
            po_status:"Received"    
        },
        {
            key: '1',
            name: 'Danish Raza',
            buyer: 'Danish Raza',
            value: 32,
            customer_id: "1100712",
            customer_name: "Danish Raza",
            po_id: "#4500149543",
            material: "material 1",
            order_ammount: '235,000.00',
            requirement:"Type I",
            due_date: "2022-10-09",
            valid_from: "2022-10-09",
            address: 'New York No. 1 Lake Park',
            status: 'Send',
            invoice_status:"Paid",
            invoice_no: "#123",
            title:"title 1",
            category: "category 1",
            certifying_body: "body 1",
            editor:"Editor 1",
            version:"Version 2",
            dol:"DOL 1",
            dop:"DOP 2",
            isbn:"ISBN 1",
            "ship_to":"Hyderabad",
            in_house_publication: "Publication 1",
            purchase_status:"Dispatched",
            po_status:"Received"
        }
    ];
    if(dependentData.po_id) {
        let filteredData = _mockData.filter(rec => dependentData.po_id.includes(rec.po_id))
        if(filteredData && filteredData.length>0) {
            setData(filteredData)
        } else {
            setData(data)
        }  
    } else if(dependentData.invoice_no) {
        let filteredData = _mockData.filter(rec => dependentData.invoice_no.includes(rec.invoice_no))
        if(filteredData && filteredData.length>0) {
            setData(filteredData)
        } else {
            setData(data)
        }  
    } else {
        setData(_mockData)
    }
    setOriginalData(_mockData)
    const columnConfig = cellHandler(columns, selectedOption, helperFuntion)
    setAllColumn(columnConfig)
    setCurColumn(columnConfig)

   },[])

   useEffect(() => {
        // if(dependentData.po_id) {
        //     let filteredData = originalData.filter(rec => dependentData.po_id.includes(rec.po_id))
        //     if(filteredData && filteredData.length>0) {
        //         setData(filteredData)
        //     } else {
        //         setData(data)
        //     }  
        // }
   },[dependentData])
   let helperFuntion = {
        setOverlay: (params) => {
           return dispatch(setOverlay({...params}))
        }
   }

    const dropDownHandler = (key,value) => {
        setSelectedOption({[key]: value})
        const columnConfig = cellHandler(columns, {[key]: value}, helperFuntion)
        setAllColumn(columnConfig)
        setCurColumn(columnConfig)
    }

    const columnSelector = (column) => {
        let index = _.findIndex(curColumn, column)
        if(index != -1) {
            let modColumn = [...curColumn]
            modColumn.splice(index,1)
            setCurColumn(modColumn)
        } else if(index == -1) {
            let modColumn = [...curColumn]
            modColumn.push(column)
            modColumn.sort((a, b) => {
                let sortingArr = _.keys(Utils.sortOrder(columns._order))
                return sortingArr.indexOf(a.dataIndex) - sortingArr.indexOf(b.dataIndex);
            });
            setCurColumn(modColumn)
        }
    }

    const filterHandler = (data) => {
        console.log(data)
    }

    let columnSelectorComponent = _.map(allColumn, col => {
        if(col.type != "action") {
            let i = _.findIndex(curColumn, c => c.dataIndex == col.dataIndex)
            return <div onClick={() => columnSelector(col)}><Icon type="check-mark" checked={i == -1 ? false : true}/> {col.title}</div>
        }
    })
    
    let filterFormConfig = {_order:{}};
    let filterFieldCounter = 1;
    _.map(curColumn, col => {
        if(col.type != "action") {
            filterFormConfig._order={...filterFormConfig._order, [col.dataIndex]: filterFieldCounter}
            let uniqueValues = []
            let fieldType = "dropdown"
            _.map(data,rec => {
                if(!uniqueValues.includes(rec[col.dataIndex])) {
                    let isDate = moment(rec[col.dataIndex], "YYYY-MM-DD", true).isValid()
                    if(isDate) {
                        fieldType = "date-range"
                    } else if(!isNaN(rec[col.dataIndex])) {
                        fieldType = "slider" 
                    }
                    uniqueValues.push(rec[col.dataIndex])
                }
            })
            let options = {}
            _.map(uniqueValues, (r,i) => {
                options={...options, [r]: i}
            })
            filterFormConfig[col.dataIndex] = {
                "type": fieldType,
                "placeholder": `Select ${col.title}`,
                "width":"100%",
                "key": col.dataIndex,
                "label": col.title,
                "flex": true
            }
            if(fieldType=="dropdown") {
                filterFormConfig[col.dataIndex]._order = options
            }
            if(fieldType=="slider"){
                filterFormConfig[col.dataIndex].min = _.min(uniqueValues)
                filterFormConfig[col.dataIndex].max = _.max(uniqueValues)
            }
            filterFieldCounter++
        }
    })
    filterFormConfig._order["submit"]=100
    filterFormConfig["submit"] = {
        type:"button",
        button_type:"primary",
        display:"Set Filters"
    }

    return (
        <div 
            className="widget table-wrapper"
            data-componentDontExist={componentDontExist}
            >
            <Header 
                config={config}
                isEditable={isEditable} 
                onChange={dropDownHandler}
                componentIndex={componentIndex}
                selectedOption={selectedOption}
                columnSelectorComponent={
                     <Popover placement="leftTop" title={false} content={columnSelectorComponent} trigger="click">
                        <Button className="popover-button-wrapper">
                            <div className="table-column-icon"></div>
                        </Button>
                    </Popover>
                }
                filterSelectorComponent={
                    <Popover className="table-filter-form" placement="leftTop" title={false} content={<FormComponent template="table-filter-popup no-box-shadow" config={filterFormConfig} id={config.id} width={"440px"} onSubmit={filterHandler}/>} trigger="click">
                       <Button className="popover-button-wrapper">
                           <Icon type="filter" width={15} height={15}/>
                       </Button>
                   </Popover>
               }
                magnifiedContent={
                    <div 
                    className="widget table-wrapper"
                    data-componentDontExist={componentDontExist}
                    >
                    <Header 
                        config={config}
                        isEditable={isEditable} 
                        onChange={dropDownHandler}
                        componentIndex={componentIndex}
                        selectedOption={selectedOption}
                        columnSelectorComponent={
                             <Popover placement="leftTop" title={false} content={columnSelectorComponent} trigger="click">
                                <Button className="popover-button-wrapper">
                                    <div className="table-column-icon"></div>
                                </Button>
                            </Popover>
                        }
                        filterSelectorComponent={
                            <Popover getContainer={() => document.body}   className="table-filter-form" placement="leftTop" title={false} content={<FormComponent template="table-filter-popup no-box-shadow" config={filterFormConfig} id={config.id} width={"440px"} onSubmit={filterHandler}/>} trigger="click">
                               <Button className="popover-button-wrapper">
                                   <Icon type="filter" width={15} height={15}/>
                               </Button>
                           </Popover>
                       }
                        />
                    <Table dataSource={data} columns={curColumn} pagination={config.pagination === false ? false : null} showSorterTooltip={false}/>
                </div>
                }
                />
            <Table
                sticky={sticky}
                dataSource={data} 
                columns={curColumn}
                pagination={{
                    current: 1,
                    pageSize: 10,
                    pageSizeOptions: [5,10, 20, 30],
                    total: 100
                  }}
                // pagination={config.pagination === false ? false : null} 
                showSorterTooltip={false}
            />
        </div>
    )
}
export default TableComponent