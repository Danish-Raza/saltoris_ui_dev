import DropDown from "./Charts/DropDown";
import _ from "underscore"
import { useDispatch } from "react-redux";
import { changeConfig } from "../actions/appActions";

function Header(props) {
    const { config, isEditable, componentIndex, onChange=()=>{}, selectedOption } = props;
    const { title, dropdown, display } = config;
    const dispatch = useDispatch()
    let headerConfig = config.header_config;
    let widgetTitle = title || display;
    if(headerConfig) {
        if(headerConfig.template == "dropdown-title" && selectedOption) {
            widgetTitle=''
            if(typeof selectedOption[dropdown.key] == "object" && selectedOption[dropdown.key].length) {
             
               _.map(selectedOption[dropdown.key], (o, i) => widgetTitle += (i != 0 ? " - " : "") + o)
            } else if(typeof selectedOption[dropdown.key] == "string") {
                widgetTitle = selectedOption[dropdown.key]
            }
           
        }
    }
    return (
        <div className="widget-header">
            <div className="widget-title">{widgetTitle}</div>
            {dropdown !== undefined && <DropDown config={dropdown} onChange={onChange} />}
            {isEditable && !config.replicate ? <div className="remove-button" onClick={()=> dispatch(changeConfig({action:"REMOVE_WIDGET", id:config.id}))}>x</div>:""}
            {isEditable && config.replicate && <div className="replicate-button" onClick={()=> dispatch(changeConfig({action:"REPLICATE_WIDGET",component: config, index: componentIndex})) }>+</div>}
        </div>
    )
}
export default Header;