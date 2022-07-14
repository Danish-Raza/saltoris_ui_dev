import Utils from "../Utils";
import _ from "underscore"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePageView } from "../actions/appActions";
import Icon from "../Icon";
import { useState } from "react";
import saltorisLogo from "../images/saltoris.png";
import dixonLogo from "../images/deil-logo.png";

const SideBar = (props) => {
    let { config, curPage, curView, userDetail } = props;
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(true)
    let sortedOrder = _.keys(Utils.sortOrder(config._order))
    const navigate = useNavigate();

    const clickHandler = (view) => {
        navigate(`/?cur_page=${curPage}&cur_view=${view}`)
        dispatch(changePageView(curPage, view))
    }

    let appLogo = userDetail ?  userDetail.client_logo == "customer"? `url('${dixonLogo}')` : userDetail.client_logo || `url('${saltorisLogo}')` : null
   
    return (
        <div className="sidebar"  data-status={ collapsed ? "active" : "inactive"}>
            <div className="saltoris-logo-wrapper">
                <div className="app-logo" style={{position:"relative", backgroundImage: appLogo}}></div>
                <span className="border-bottom"></span>
                <Icon type={collapsed ? "arrow-left" : "arrow-right"} width={20} height={20} onClick={() => setCollapsed(!collapsed)}/>
            </div>
           {
                _.map(sortedOrder, view => 
                    config[view] && ( 
                        <div className="view-tab-wrapper" data-view-status={curView==view ? true: false} onClick={() => clickHandler(view)}>
                            <Icon type={config[view].icon} width={20} height={20}/>
                            <div className="view-tab" >{config[view].display}</div>
                        </div>
                    )
                )
            }
        </div>
    )
    
}
export default SideBar;