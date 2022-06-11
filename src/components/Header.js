import DropDown from "./Charts/DropDown";

function Header(props) {
    const { config } = props;
    const { title, dropdown, display } = config;
    return (
        <div className="widget-header">
            <div className="widget-title">{title || display}</div>
            {dropdown !== undefined && <DropDown config={dropdown}/>}
        </div>
    )
}
export default Header;