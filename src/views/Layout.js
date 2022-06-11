
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserConfig, logout } from "../actions/appActions";
import Navigation from "../components/Navigation";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

function Layout(props={}) {
    const dispatch = useDispatch();
    let appData = useSelector(state => state.appData)
    const navigate = useNavigate()

    useEffect(() => {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let curPage = params ? params.cur_page : null;
      let curView = params ? params.cur_view : null;
      dispatch(getUserConfig(appData.userDetail.config_name, curPage, curView))
    },[])
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let curPage = params ? params.cur_page : null;
    let curView = params ? params.cur_view : null;
    if(!curPage && !curView && appData && appData.appParams) {
      navigate(`/?cur_page=${appData.appParams.curPage}&cur_view=${appData.appParams.curView}`)
    }
  return (
    <div className="App">
        {appData.userConfig ?
          <Fragment>
           <div style={{display:"flex"}}>
              <SideBar 
                curPage={appData.appParams.curPage}  
                curView={appData.appParams.curView} 
                config={appData.userConfig[appData.appParams.curPage]}
                userDetail={appData.userDetail}
              />
              <div style={{width:"100%", height: "100vh", overflowY: "auto"}}>
                <Navigation 
                  config={appData.userConfig} 
                  curPage={appData.appParams.curPage} 
                  userDetail={appData.userDetail}
                /> 
                <Widgets config={appData.userConfig[appData.appParams.curPage][appData.appParams.curView].widgets}/>
              </div>
           </div>
          </Fragment>
          : 
        <div style={{width: "100%", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}><Spin size="large" /></div>}
    </div>
  );
}

export default Layout;
