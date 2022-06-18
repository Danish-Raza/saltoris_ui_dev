import DropDown from "./Charts/DropDown";

function Header(props) {
    const { config, isEditable, removeHandler, replicateHandler, componentIndex, onChange=()=>{} } = props;
    const { title, dropdown, display } = config;
    return (
        <div className="widget-header">
            <div className="widget-title">{title || display}</div>
            {dropdown !== undefined && <DropDown config={dropdown} onChange={onChange} />}
            {isEditable && !config.replicate ? <div className="remove-button" onClick={()=> removeHandler(config.id)}>x</div>:""}
            {config.replicate && <div className="replicate-button" onClick={()=> replicateHandler(config, componentIndex)}>+</div>}
        </div>
    )
}
export default Header;