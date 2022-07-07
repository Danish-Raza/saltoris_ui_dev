import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../actions/appActions";
import Icon from "../Icon";

function UserProfile(props) {
    const { userDetail } = props;
    const [dropDownStatus, setDropDownStatus] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    document.querySelector("body").addEventListener("click", (e) => {
        var element = document.querySelector('.user-profile-section');
        if(element && !element.contains(e.target)) {
            setDropDownStatus(false)
        }

    })
    const handleLogout = () => {
        navigate("/")
        dispatch(logout())
    }
    return (
        <Fragment>
            <div className="profile-section" onClick={() => setDropDownStatus(!dropDownStatus)}>
                <div className="user-photo">
                    {userDetail.username.charAt(0)}
                </div>
                <div className="username-wrapper">
                    <div className="username">{userDetail.username}</div>
                    <div className="user-role">{userDetail.user_role}</div>
                </div>
                <div className="down-arrow">
                    <Icon type="dropdown" width={15} height={15}/>
                </div>
            </div>
            {
                dropDownStatus && (
                    <div className="profile-dropdown">
                        <div className="option">
                            {userDetail.email}
                        </div>
                        <div className="option logout-option" onClick={handleLogout}>
                          Logout
                        </div>
                    </div>
                )
            }
        </Fragment>

    )
    
}
export default UserProfile