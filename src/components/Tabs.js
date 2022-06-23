import Utils from "../Utils";
import _ from "underscore"
import { useDispatch } from "react-redux";
import { setOverlay } from "../actions/appActions";
import Icon from "../Icon";
import { useEffect } from "react";

function Tab(props) {
    const { config, dependentData} = props;
    const dispatch = useDispatch()
    let sortedOrder = _.keys(Utils.sortOrder(config._order))
    useEffect(()  => {


    },[dependentData])

    return (
        <div className="tab-wrapper">
            {
                _.map(sortedOrder, order => {
                    return (
                        <div className="tab" onClick={() => dispatch(setOverlay({show: true, overlay: config[order].widgets , dependentData: dependentData}))}>
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