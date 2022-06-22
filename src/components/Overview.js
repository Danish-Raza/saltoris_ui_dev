import Utils from "../Utils";
import _ from "underscore";
import Icon from "../Icon";
import { Fragment, useEffect, useRef, useState } from "react";
import DropDown from "./Charts/DropDown";
import { Modal } from "antd";
import GenerateReport from "./GenerateReport";
import { applyFilters } from "../actions/appActions";
import { useDispatch, useSelector } from "react-redux";
function Overview(props) {
    const { config={}, toggleIsEditable, isEditable } = props;
    const [sortedTabOrder, setSortedTabOrder] = useState([]);
    let appData = useSelector(state => state.appData)
    const dispatch = useDispatch();
    const [draggedItem, setDraggedItem] = useState(null);
    const overviewWrapper = useRef(null);
    const { display } = config;
    useEffect(() => {
        let _sortedTabOrder = _.keys(Utils.sortOrder(config._order))
        setSortedTabOrder(_sortedTabOrder)
        let appliedFilters = {}
        if(config.dropdown && config.dropdown.default && !appData.appParams.appliedFilters[config.dropdown.dropdown.key]) {
            let _dropdownDefault = _.keys(Utils.sortOrder(config.dropdown.default._order))
            appliedFilters= {
               [config.dropdown.key]: _dropdownDefault[0]
            }
        }
        if(config.date_range && config.date_range.default && !appData.appParams.appliedFilters["date_range"]) {
            let _dateRangeDefault = _.keys(Utils.sortOrder(config.date_range.default._order))
            appliedFilters= {
                ...appliedFilters,
                "date_range": _dateRangeDefault[0]
            }
        }
        if(!_.isEmpty(appliedFilters)) {
            dispatch(applyFilters(appliedFilters))
        }
    },[])
    const data = {
        "Invoices": {
          "previous_score": "$21350",
          "difference": "2.5",
          "gain": "27632"
        },
        "Opportunities": {
          "previous_score": "$20119",
          "difference": "-2.5",
          "gain": "165"
        },
        "Bid": {
          "previous_score": "$20119",
          "difference": "2.5",
          "gain": "165"
        },
        "Payments": {
          "previous_score": "$20119",
          "difference": "-2.5",
          "gain": "165"
        }
    }

    const handleDrop = (ev) => {
        let dragBoxIndex = null
        let dropBoxIndex = null
        let dragBox = null
        let dropBox =  null
        let field = null
        let detailPanelChildren = overviewWrapper.current.children;
        for (let i = 0; i < detailPanelChildren.length; i++) {
            if (detailPanelChildren[i].id === draggedItem) {
                let _componentsIndex =  _.findIndex(sortedTabOrder, r => r == draggedItem)
                dragBoxIndex = _componentsIndex
                dragBox = _componentsIndex!=-1 ?  sortedTabOrder[_componentsIndex]: null
            }
            if (detailPanelChildren[i].id === ev.currentTarget.id) {
                let _componentsIndex =  _.findIndex(sortedTabOrder, r => r == ev.currentTarget.id)
                dropBoxIndex = _componentsIndex
                dropBox = _componentsIndex!=-1 ?  sortedTabOrder[_componentsIndex]: null
            }
        }
        let modOrder =  [...sortedTabOrder]
        if(dragBoxIndex != -1 && dropBoxIndex != -1 && dragBox) {
            modOrder.splice(dragBoxIndex, 1)
            modOrder.splice(dropBoxIndex, 0, dragBox)
            setSortedTabOrder(modOrder)
            setDraggedItem(null)
        }
    }

    const handleDrag = (ev) => {
        setDraggedItem(ev.currentTarget.id);
    }

    const removeHandler = (id) => {
        let modOrder =  [...sortedTabOrder]
        let i = _.findIndex(modOrder, r=> r == id)
        if(i!=-1) {
            modOrder.splice(i, 1)
            setSortedTabOrder(modOrder)
        }
    }

    const changeHandler = (key, value) => {
        dispatch(applyFilters({[key]: value}))
    }

    
   
    return (
        <div className="overview" >
            {config.dropdown ? <DropDown value={appData && appData.appParams ? appData.appParams.appliedFilters[config.dropdown.key] : null} config={config.dropdown} onChange={changeHandler}/> : null}
            <div className="overview-wrapper-title">
                {display}
                {config.date_range ? <DropDown value={appData && appData.appParams ? appData.appParams.appliedFilters["date_range"] : null} config={config.date_range}  onChange={changeHandler}/> : null}
                <div className="edit-icon" data-isEditable={isEditable} onClick={toggleIsEditable}>
                    <Icon type="overview"  width={12} height={12}/>
                </div>
                {config.generate_report ? (
                     <GenerateReport config={config.generate_report}/>
                ) : ""}
            </div>
            <div ref={overviewWrapper} style={{display:"flex"}} >
            {
               _.map(sortedTabOrder, tab => {
                   let rec = {...data[config[tab].mapping_key], _key: tab}
                   let sortOrder = _.keys(Utils.sortOrder(config[tab]._order))
                   return (
                
                    <div className="overview-block"
                         draggable={isEditable}
                         onDrop={handleDrop} 
                         onDragStart={handleDrag}
                         onDragOver={(event) => {
                             // let event = e as Event;
                             event.stopPropagation();
                             event.preventDefault();
                         }}
                         id={tab}
                     >
                        {isEditable ? <div className="remove-button" onClick={() => removeHandler(tab)}>-</div> : ""}
                        {
                             _.map(sortOrder, order => {
                                if(config[tab][order].multiple) {
                                    let multipleOrder = _.keys(Utils.sortOrder(config[tab][order].multiple._order))
                                    return (
                                        <div className="cell multiple"> 
                                            {
                                                _.map(multipleOrder, mOrder => {
                                                    if(config[tab][order].multiple[mOrder].template=="arrow-up-down"){
                                                        return (
                                                            <div data-point={mOrder} data-template="arrow-up-down" data-positive={rec[mOrder] > 0 ? true: false}>
                                                                {rec[mOrder] > 0 ? "+" : "" }
                                                                {Utils.injectData(config[tab][order].multiple[mOrder].display, rec)}
                                                                {rec[mOrder] < 0 ? <span>&#8595;</span>: <span>&#8593;</span>}
                                                            </div>
                                                        )
                                                    } else {
                                                        if(config[tab][order].multiple[mOrder].is_percent) {
                                                            return (
                                                                <div>{Utils.injectData(config[tab][order].multiple[mOrder].display, rec)}%</div>
                                                            )
                                                        } else if(config[tab][order].multiple[mOrder].is_currency) {
                                                            return (
                                                                <div>{config[tab][order].multiple[mOrder].is_currency}{Utils.injectData(config[tab][order].multiple[mOrder].display, rec)}</div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div>{Utils.injectData(config[tab][order].multiple[mOrder].display, rec)}</div>
                                                            )
                                                        }
                                                    }
                                                })
                                            }
                                        </div>
                                    )
                                } else {
                                 return (
                                        <div className="cell" data-point={order}>
                                            {Utils.injectData(config[tab][order].display, rec)}
                                        </div>
                                    )
                                }
                            })

                        }
                   </div>
                   )
               })
           }

            </div>
           
        </div>
    ) 
}
export default Overview;