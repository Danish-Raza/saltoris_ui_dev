import DropDown from "./Charts/DropDown";

function Header(props) {
    const { config, isEditable, removeHandler } = props;
    const { title, dropdown, display } = config;
    return (
        <div className="widget-header">
            <div className="widget-title">{title || display}</div>
            {dropdown !== undefined && <DropDown config={dropdown}/>}
            {isEditable?<div className="remove-button" onClick={()=> removeHandler(config.id)}>x</div>:""}
        </div>
    )
}
export default Header;