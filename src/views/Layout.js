
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserConfig, logout } from "../actions/appActions";
import Navigation from "../components/Navigation";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";

function Layout(props={}) {
    const dispatch = useDispatch();
    let appData = useSelector(state => state.appData)
    const submitHandler = () => {
        dispatch(logout())
      }

    useEffect(() => {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let curPage = params ? params.cur_page : null;
      let curView = params ? params.cur_view : null;
      dispatch(getUserConfig(appData.userDetail.config_name, curPage, curView))
    },[])
    console.log(appData)
  return (
    <div className="App">
        {appData.userConfig ? 
          // JSON.stringify(appData.appParams)
          <Fragment>
            <Navigation 
              config={appData.userConfig} 
              curPage={appData.appParams.curPage} 
              userDetail={appData.userDetail}
            /> 
            <div className="sidebar-widgets-panel-wrapper">
              <SideBar 
                curPage={appData.appParams.curPage}  
                curView={appData.appParams.curView} 
                config={appData.userConfig[appData.appParams.curPage]}
                userDetail={appData.userDetail}
              />
              {/* <Widgets config={appData.userConfig[appData.appParams.curPage][appData.appParams.curView].widgets}/> */}
            </div>
            
          </Fragment>
          : 
        "loader"}
    </div>
  );
}

export default Layout;
