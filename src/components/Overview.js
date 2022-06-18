import Utils from "../Utils";
import _ from "underscore";
import Icon from "../Icon";
import { Fragment, useEffect, useRef, useState } from "react";
import DropDown from "./Charts/DropDown";
function Overview(props) {
    const { config={}, toggleIsEditable, isEditable } = props;
    const [sortedTabOrder, setSortedTabOrder] = useState([])
    const [draggedItem, setDraggedItem] = useState(null)
    const overviewWrapper = useRef(null)
    const { display } = config;
    useEffect(() => {
        let _sortedTabOrder = _.keys(Utils.sortOrder(config._order))
        setSortedTabOrder(_sortedTabOrder)
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

    const changeHandler = (obj) => {

    }
   
    return (
        <div className="overview" >
            {config.dropdown ? <DropDown config={config.dropdown} onChange={changeHandler}/> : null}
            <div className="overview-wrapper-title">
                {display}
                {config.date_range ? <DropDown config={config.date_range}  onChange={changeHandler}/> : null}
                <div className="edit-icon" data-isEditable={isEditable} onClick={toggleIsEditable}>
                    <Icon type="overview"  width={12} height={12}/>
                </div>
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
                        {isEditable ? <div className="remove-button" onClick={() => removeHandler(tab)}>x</div> : ""}
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
                                                        return (
                                                            <div>{Utils.injectData(config[tab][order].multiple[mOrder].display, rec)}</div>
                                                        )
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