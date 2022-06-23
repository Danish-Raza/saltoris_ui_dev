import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setOverlay } from "../actions/appActions";
import Widgets from "./Widgets";

function Overlay(props) {
    let overLayContent = useRef();
    let dispatch = useDispatch()
    const { config={}, appData } = props;
    const hideOverlay = (e) => {
        if(!overLayContent.current.contains(e.target)) {
            dispatch(setOverlay({show: false}))
        }
    }
    return (
    config.show && 
    <div className="overlay-wrapper" data-status={config.show} onClick={hideOverlay}>
        <div className="dark-background"></div>
        <div className="overlay-content" ref={overLayContent}>
            <Widgets
                key={`Overlay-${config.components.id}-${appData.appParams.curPage}-${appData.appParams.curView}-widgets`}
                curPage={appData.appParams.curPage}  
                curView={appData.appParams.curView}
                appData={appData}
                config={config.components}
                dependentData={config.dependentData}
            />
        </div>
    </div>
    )
}
export default Overlay