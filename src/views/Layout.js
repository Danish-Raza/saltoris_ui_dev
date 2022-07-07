
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserConfig, logout } from "../actions/appActions";
import Navigation from "../components/Navigation";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import _ from "underscore";
import Overlay from "../components/Overlay";

function Layout(props={}) {
    const dispatch = useDispatch();
    let appData = useSelector(state => state.appData)
    const navigate = useNavigate()

    useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      let curPage = params ? params.get("cur_page") : null;
      let curView = params ? params.get("cur_view") : null;
      let appliedFilters = {}
      for (const param of params) {
        if(param[0]!=="cur_page" && param[0]!=="cur_view") {
          appliedFilters = {
            ...appliedFilters,
            [param[0]]: param[1]
          }
        }
      }
      dispatch(getUserConfig(appData.userDetail.config_name, curPage, curView, appliedFilters))
    },[])

    useEffect(() => {
     
      if(appData.appParams.curPage && appData.appParams.curView){
        let url = `/?cur_page=${appData.appParams.curPage}&cur_view=${appData.appParams.curView}`
        if(appData.appParams.appliedFilters && !_.isEmpty(appData.appParams.appliedFilters)) {
          _.map(appData.appParams.appliedFilters, (value,key) => {
            url += `&${key}=${value}`
          })
        }  
        navigate(url)
      }
    },[appData.appParams])

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let curPage = params ? params.cur_page : null;
    let curView = params ? params.cur_view : null;
    
    if(!curPage && !curView && appData && appData.appParams) {
      let url = `/?cur_page=${appData.appParams.curPage}&cur_view=${appData.appParams.curView}`
      if(appData.appParams.appliedFilters && !_.isEmpty(appData.appParams.appliedFilters)) {
        _.map(appData.appParams.appliedFilters, (value,key) => {
          url += `&${key}=${value}`
        })
      }
      navigate(url)
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
                <Widgets
                  key={`${appData.appParams.curPage}-${appData.appParams.curView}-widgets`}
                  curPage={appData.appParams.curPage}  
                  curView={appData.appParams.curView}
                  appData={appData}
                  config={appData.userConfig[appData.appParams.curPage][appData.appParams.curView].widgets}
                />
              </div>
           </div>
          </Fragment>
          : 
        <div style={{width: "100%", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}><Spin size="large" /></div>}
        <Overlay appData={appData} config={appData ? appData.overlay : {}} />
    </div>
  );
}

export default Layout;
