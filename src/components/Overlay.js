import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setOverlay } from "../actions/appActions";

function Overlay(props) {
    let overLayContent = useRef();
    let dispatch = useDispatch()
    const { config={} } = props;
    const hideOverlay = (e) => {
        if(!overLayContent.current.contains(e.target)) {
            dispatch(setOverlay({show: false}))
        }
    }
    return (
    config.show && 
    <div className="overlay-wrapper" data-status={config.show} onClick={hideOverlay}>
        <div className="dark-background">
       
        </div>
        <div className="overlay-content" ref={overLayContent}>
        </div>
    </div>
    )
}
export default Overlay