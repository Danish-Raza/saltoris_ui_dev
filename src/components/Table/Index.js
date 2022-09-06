import _ from "underscore"
import Utils from "../../Utils";
import Header from "../Header";
import { Table, Popover, Button, InputNumber, DatePicker, notification} from 'antd';
import cellHandler from "./CellHandler";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePageView, setOverlay } from "../../actions/appActions";
import Icon from "../../Icon";
import FormComponent from "../Form/FormComponent";
import moment from "moment";
import { useNavigate } from "react-router";
import { changeStatus } from "../../actions/headerAction";
import { changeTableParams } from "../../actions/tableAction";

function TableComponent(props) {
    const { handleDrop, handleDrag, isEditable, componentIndex, dependentData, componentDontExist, tabData } = props;
    const [config, setConfig] = useState(props.config.table_type  ==  "tabs-dependent"  ? {...props.config[props.config.default_table], table_type:"tabs-dependent", tabs: props.config.tabs, check_condition: props.config.check_condition}  : props.config )
    const { columns, sticky }  = config;
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [curColumn, setCurColumn] = useState([])
    const [allColumn, setAllColumn] = useState([])
    const [selectedOption, setSelectedOption] = useState({});
    const [changedTableData, setchangedTableData] = useState({})
    const [confirmationStatus,setConfirmationStatus] = useState()

    const headerData = useSelector(state => state.headerData)
    const tablesState = useSelector(state => state.tables)

    let data = []
    let selectedRowKeys = []
    let dataAvailable = null
    let nestedDataAvailable = null
   
    if(tablesState[config.id]) {
        data = tablesState[config.id].dataSet
    } 
    if(config.dependent_table && !config.api && tablesState) {
        dataAvailable = []
        _.map(config.dependent_table_ids, id => {
            if(tablesState[id]) {
                _.map(tablesState[id].selectedRow, (rec,ind) => {
                    let i = _.findIndex(dataAvailable, r => r.key == rec.key)
                    if(i == -1) {
                        dataAvailable.push(rec)
                    }
                })
                if(tablesState[id].nestedSelectedRow) {
                    nestedDataAvailable = []
                    _.map(tablesState[id].nestedSelectedRow, (rec,ind) => {
                        let i = _.findIndex(nestedDataAvailable, r => r.key == rec.rowKeyValue.key)
                        if(i == -1) {
                            nestedDataAvailable.push(rec.rowKeyValue)
                        }
                    })
                }
            }
        })
    }

    const sortHandler = () => {

    }

    const paginationHandler = () => {
        
    }

    if(tablesState[config.id]){
        let activeKeys =  _.map(tablesState[config.id].selectedRow, rec => rec.key);
        selectedRowKeys = _.uniq(activeKeys)
    }

    useEffect(() => {
        let defaultDropdown = config.dropdown ? config.dropdown.default: null;
        let params = {}
        if(!dataAvailable) {
            if(defaultDropdown) {
                let sortedOrder = _.keys(Utils.sortOrder(defaultDropdown._order))
                let dropdownKey = config.dropdown.key;
                let mode = defaultDropdown.mode;
                params = {
                    [dropdownKey]: mode == "select" ? sortedOrder[0]: sortedOrder
                };
                setSelectedOption(params);
            }
            if(config.dependent_table && config.selectable && config.api && tablesState) {
                let tableId = config.dependent_table_ids[0]
                let activeKeysData = tablesState[tableId] ? tablesState[tableId].selectedRow : []
                let nestedSelectedRow = tablesState[tableId] ? tablesState[tableId].nestedSelectedRow : []
                dispatch(changeTableParams({config: config, init: true, activeKeysData, nestedSelectedRow}))
            } else {
                dispatch(changeTableParams({config: config, init: true}))
            }
        } else {
            dispatch(changeTableParams({config: config, init: true}))
        }
        const columnConfig = cellHandler(columns, selectedOption, helperFuntion,null, true)
        setAllColumn(columnConfig)
        setCurColumn(columnConfig)
    },[])

    useEffect(() => {
        if(tabData && !_.isEmpty(tabData)){
            let modConfig = {...config}
            if(props.config && props.config.check_condition && props.config.table_type  ==  "tabs-dependent" && tabData) {
                let result = Utils.returnSuccessfullObject(config.check_condition, tabData)
                if(result) {
                    modConfig =  { ...props.config[result.load_table], table_type: props.config.table_type, tabs: {...props.config.tabs,defaults: result.load_table}, check_condition: props.config.check_condition }
                }
            }
            let defaultDropdown = modConfig.dropdown ? modConfig.dropdown.default: null;
            let params = {}
            if(!dataAvailable) {
                if(defaultDropdown) {
                    let sortedOrder = _.keys(Utils.sortOrder(defaultDropdown._order))
                    let dropdownKey = modConfig.dropdown.key;
                    let mode = defaultDropdown.mode;
                    params = {
                        [dropdownKey]: mode == "select" ? sortedOrder[0]: sortedOrder
                    };
                    setSelectedOption(params);
                }
                if(modConfig.dependent_table && modConfig.selectable && modConfig.api && tablesState) {
                    let tableId = modConfig.dependent_table_ids[0]
                    let activeKeysData = tablesState[tableId] ? tablesState[tableId].selectedRow : []
                    let nestedSelectedRow = tablesState[tableId] ? tablesState[tableId].nestedSelectedRow : []
                    dispatch(changeTableParams({config: modConfig, init: true, activeKeysData, nestedSelectedRow}))
                } else {
                    if(!tablesState[modConfig.id]){
                        dispatch(changeTableParams({config: modConfig, init: true}))
                    }
                }
            } else {
                dispatch(changeTableParams({config: modConfig, init: true}))
            }
            const columnConfig = cellHandler(modConfig.columns, selectedOption, helperFuntion,null, true)
            setConfig(modConfig);
            setAllColumn(columnConfig)
            setCurColumn(columnConfig)
        }
    },[tabData])

    const onSelectChange = (newSelectedRowKeys) => {
        dispatch(changeTableParams({config: config, newSelectedRowKeys, type:"SELECT_TABLE_ROW"}))
    }

    const dropDownHandler = (key,value) => {
        if(key == "change_status") {
           dispatch(changeStatus({tableId:config.id, operation: value}))
        } else {
            setSelectedOption({[key]: value})
            const columnConfig = cellHandler(columns, {[key]: value}, helperFuntion, null, true)
            setAllColumn(columnConfig)
            setCurColumn(columnConfig)
        }
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
            let restrictedColumn = ["customer_id"]
            let modData = dataAvailable || data
            _.map(modData,rec => {
                if(!uniqueValues.includes(rec[col.dataIndex])) {
                    let isDate = moment(rec[col.dataIndex], "YYYY-MM-DD", true).isValid()
                    if(!restrictedColumn.includes(col.dataIndex)) {
                        if(isDate) {
                            fieldType = "date-range"
                        } else if(!isNaN(rec[col.dataIndex])) {
                            fieldType = "slider" 
                        }
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
                filterFormConfig[col.dataIndex].min = Number(_.min(uniqueValues))
                filterFormConfig[col.dataIndex].max = Number(_.max(uniqueValues))   
            }
            filterFieldCounter++
        }
    })
    filterFormConfig._order["filter_by"] = 99;
    filterFormConfig["filter_by"] = {
        "type": "text",
        "placeholder": `Filter by keyword`,
        "width":"100%",
        "key": "filter_by",
        "label": "Filter by",
        "flex": true
    }
    filterFormConfig._order["submit"] = 100
    filterFormConfig["submit"] = {
        type:"button",
        button_type:"primary",
        display:"Set Filters"
    }

  

    const changeConfirmationStatus = () => {
        setConfirmationStatus(null)
        notification["success"]({
            message: 'Success',
            description:
              'New version created successfully'
        });

    }

    const expandedRowRender =  (record, index, indent, expanded)  => {
        const _columns = config.expandedRowRender.columns
        let allowEdit = config.selectable ? headerData && headerData[config.id] && headerData[config.id].isEditable && selectedRowKeys.includes(record.key) : true
        let parentColumn = record;
        const columnConfig = cellHandler(_columns, selectedOption, helperFuntion, changedTableData, allowEdit, parentColumn)
        let nestedSelectedRow = []
        if(tablesState[config.id].nestedSelectedRow) {
            _.map(tablesState[config.id].nestedSelectedRow, r => nestedSelectedRow.push(r.rowKeyValue.key +""))
        }
        
        if((headerData && headerData[config.id] && headerData[config.id].isEditable && selectedRowKeys.includes(record.key)) || (!config.selectable || nestedSelectedRow.length)) {
            columnConfig[columnConfig.length-1].title = (
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div>{columnConfig[columnConfig.length-1].title}</div>
                    <Button type="primary" onClick={changeConfirmationStatus} style={{borderRadius: 8}}>Save</Button>
                </div>
            )
        }
        return (
            <Table  
                key={JSON.stringify(record.inner_table)+config.id+"_inner_key"}
                rowSelection={
                    (headerData && headerData[config.id] && headerData[config.id].isEditable && selectedRowKeys.includes(record.key)) || (!config.selectable || nestedSelectedRow.length)? {
                    selectedRowKeys: nestedSelectedRow,
                    onChange: (v)=> {
                        dispatch(changeTableParams({type:'SELECT_NESTED_TABLE_ROW', config: config, newSelectedRowKeys: v, parentRecord: record}))
                    },
                }: null}
                columns={columnConfig}
                dataSource={nestedDataAvailable ? nestedDataAvailable : record.inner_table} 
                pagination={false} 
            />
        )
    };

    const switchDataHandler = (operation, rowIndex, column) => {
        dispatch(changeTableParams({type:'SWITCH_TABLE_ROW', config: config, operation, rowIndex, column}))
    }

    const setEditableTableData = (data, rowIndex, parentColumn) => {
        setConfirmationStatus({
            status: false,
            message: "Changes are not saved"
        })
        dispatch(changeTableParams({type:'CHANGE_TABLE_DATA', config: config, data, rowIndex, parentColumn}))

    }

    const helperFuntion = {
        setOverlay: (params) => {
            return dispatch(setOverlay({...params}))
        },
        switchDataHandler,
        setEditableTableData
    }

    let _modData = data

    if(config.redirect_on_view_all) {
        _modData= data.slice(0,5)
    }
    if(config.id=="delivery_table") {
        _modData = [data[0]]  
    }

    let downloadElement = null;
    if(config.id == "purchase_order_table") {
        downloadElement = (
            <div className="download-popover">
                <div className="title">Download Purchase Order</div>
                <div className="option">PDF</div>
                <div className="title">Download Report</div>
                <div className="option">PDF</div>
                <div className="option">CSV</div>
            </div>
        )
    } else if(config.id == "scheduling_agreement_table") {
        downloadElement = (
            <div className="download-popover">
                <div className="title">Download Scheduling Agreement</div>
                <div className="option">PDF</div>
                <div className="title">Download Report</div>
                <div className="option">PDF</div>
                <div className="option">CSV</div>
            </div>
        )
    } else if(config.id == "advance_shipping_table") {
        downloadElement = (
            <div className="download-popover">
                <div className="title">Download Advance Shipping Notification</div>
                <div className="option">PDF</div>
                <div className="title">Download Report</div>
                <div className="option">PDF</div>
                <div className="option">CSV</div>
            </div>
        )
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections:[
            {
                key: 'odd',
                text:  `Select All ${100} records`,
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                      if (index % 2 !== 0) {
                        return true;
                      }
                      return true;
                    });
                    dispatch(changeTableParams({config: config, newSelectedRowKeys, type:"SELECT_TABLE_ROW"}))
                  },
            },
            {
                key: 'odd',
                text:  `Deselect All ${100} records`,
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                      if (index % 2 !== 0) {
                        return false;
                      }
                      return false;
                    });
                    dispatch(changeTableParams({config: config, newSelectedRowKeys, type:"SELECT_TABLE_ROW"}))
                  },
              }
        ]
        
    };


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
                parentComponentData={selectedRowKeys}
                tabs={props.tabs}
                confirmationStatus={confirmationStatus}
                downloadElement={downloadElement}
                _id={props.config.table_type  ==  "tabs-dependent"? props.config.id : null}
                columnSelectorComponent={
                     <Popover getPopupContainer={() => document.body}  placement="leftTop" title={false} content={columnSelectorComponent} trigger="click">
                        <Button className="popover-button-wrapper">
                        <div className="table-column-icon"></div>
                        </Button>
                    </Popover>
                }
                filterSelectorComponent={
                    <Popover getPopupContainer={() => document.body}  className="table-filter-form" placement="leftTop" title={false} content={<FormComponent template="table-filter-popup no-box-shadow" config={filterFormConfig} id={config.id} width={"440px"} onSubmit={filterHandler}/>} trigger="click">
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
                            config={{...config, tabs:null}}
                            isEditable={isEditable} 
                            onChange={dropDownHandler}
                            componentIndex={componentIndex}
                            selectedOption={selectedOption} 
                            parentComponentData={selectedRowKeys}  
                            tabs={props.tabs}
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
                        {/* <Table  dataSource={dataAvailable || data} columns={curColumn} pagination={config.pagination === false ? false : null} showSorterTooltip={false}/> */}
                        <Table
                            key={config.id+"_table"}
                            sticky={sticky}
                            dataSource={dataAvailable || data} 
                            columns={curColumn}
                            pagination={config.pagination && {
                                size:"small", total: 100, showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                            }}
                            showSorterTooltip={false}
                            rowSelection={ config.selectable ? rowSelection : null }
                            expandable={config.expandedRowRender && {
                                expandedRowRender:expandedRowRender
                            }}
                            footer={config.redirect_on_view_all && _modData &&_modData.length>0 ? () => {
                                let paramString = config.redirect_on_view_all.split('?')[1];
                                let queryString = new URLSearchParams(paramString);
                                let cur_page = null;
                                let cur_view =  null;
                                for(let pair of queryString.entries()) {
                                    if(pair[0] == "cur_page") {
                                        cur_page = pair[1];   
                                    }
                                    if(pair[0] == "cur_view") {
                                        cur_view = pair[1];
                                    }
                                }

                                return (
                                    <div 
                                        className="view-all-button"
                                        onClick={() => {
                                            dispatch(changePageView(cur_page, cur_view))
                                            navigate(config.redirect_on_view_all)
                                        }}
                                    >   
                                        View all
                                    </div> 
                                )

                            }: false}
                            scroll={{
                                x: curColumn.length * 150,
                            }}
                        />
                    </div>
                }
            />
            <Table
                key={config.id+"_table"}
                sticky={sticky}
                dataSource={dataAvailable || _modData} 
                columns={curColumn}
                pagination={config.pagination && {
                    size:"small", total: 100, showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                }}
                showSorterTooltip={false}
                rowSelection={ config.selectable ? rowSelection : null }
                expandable={config.expandedRowRender && {
                    expandedRowRender:expandedRowRender
                }}
                footer={config.redirect_on_view_all ? () => {
                    let paramString = config.redirect_on_view_all.split('?')[1];
                    let queryString = new URLSearchParams(paramString);
                    let cur_page = null;
                    let cur_view =  null;
                    for(let pair of queryString.entries()) {
                        if(pair[0] == "cur_page") {
                            cur_page = pair[1];   
                        }
                        if(pair[0] == "cur_view") {
                            cur_view = pair[1];
                        }
                    }

                    return (
                        <div 
                            className="view-all-button"
                            onClick={() => {
                                dispatch(changePageView(cur_page, cur_view))
                                navigate(config.redirect_on_view_all)
                            }}
                        >   
                            View all
                        </div> 
                    )

                }: false}
                scroll={{
                    x: curColumn.length * 170,
                  }}
            />
        </div>
    )
}

export default TableComponent