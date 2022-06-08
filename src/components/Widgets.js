import  _ from "underscore";
import Utils from "../Utils";
import Charts from "./Charts/Index";

function Widgets(props) {
    const { config } = props;
    let components = config ? _.keys(Utils.sortOrder(config._order)) : []
    return (
        <div className="widgets-wrapper" >
            {
                _.map(components, component => {
                    let type = config[component].type
                    switch (type) {
                        case "chart":
                            return <Charts config={config[component]}/>
                        case "chart":
                            return <div>Table Component</div>
                        default:
                            break;
                    }
                })
            }
        </div>
    )
}
export default Widgets