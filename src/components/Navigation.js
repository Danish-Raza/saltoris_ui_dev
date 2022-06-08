import Utils from "../Utils";
import _ from "underscore"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePageView } from "../actions/appActions";
import UserProfile from "./UserProfile";

const Navigation = (props) => {
    let { config, curPage, userDetail } = props;
    const dispatch = useDispatch();
    let sortedOrder = _.keys(Utils.sortOrder(config._order))
    const navigate = useNavigate();
    const clickHandler = (page) => {
        let viewsOnPage = _.keys(Utils.sortOrder(config[page]._order))
        let defaultView = viewsOnPage[0]
        navigate(`/?cur_page=${page}&cur_view=${defaultView}`)
        dispatch(changePageView(page, defaultView))
    }

    return (
        <div className="navigation-bar">
            <div className="saltoris-logo-wrapper">
                <div className="saltoris-logo"></div>
                <span className="border-bottom"></span>
            </div>
            <div className="nav-bar-right-section">
                <div className="nav-tab-wrapper">
                    {
                        _.map(sortedOrder, page => 
                            config[page] && <div data-tab-status={curPage == page ? true: false} className="nav-tab" onClick={() => clickHandler(page)}>{config[page].display}</div>
                        )
                    }
                </div>
                <div className="user-profile-section">
                    <UserProfile userDetail={userDetail}/>
                </div>
            </div>
        </div>
    )
    
}
export default Navigation;