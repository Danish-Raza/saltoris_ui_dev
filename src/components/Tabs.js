import Utils from "../Utils";
import _ from "underscore"
import { useDispatch } from "react-redux";
import { setOverlay } from "../actions/appActions";
import Icon from "../Icon";
import { useEffect, useState } from "react";

function Tab(props) {
    const { config, dependentData, orderHandler} = props;
    const [activeTab,  setActiveTab] = useState(config.defaults)
    const dispatch = useDispatch()
    useEffect(() => {
        if(!props.activeTab && config.defaults){
           // setActiveTab(config.defaults)
        } else {
            setActiveTab(props.activeTab)
        }
       
    },[props.activeTab])
    
    
    let sortedOrder = _.keys(Utils.sortOrder(config._order))
    useEffect(()  => {


    },[dependentData])

    return (
        <div className="tab-wrapper">
            {config.title && <div className="tab-title">{config.title}</div>}
            {
                _.map(sortedOrder, order => {
                    let clickAction = () => dispatch(setOverlay({show: true, overlay: config[order].widgets , dependentData: dependentData}))
                    if(config[order].on_click == "change_order"){
                        clickAction =  () => {
                            orderHandler({"tab": order})
                        }
                    }
                    return (
                        <div className="tab" onClick={clickAction} data-on-click={config[order].on_click} data-status={activeTab==order}>
                            {config[order].icon && <Icon type={config[order].icon} width={15} height={15}/>}
                            {config[order].display}
                        </div>
                    )
                })
            }
            
        </div>
    )
}
export default Tab;