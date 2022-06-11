import  _ from "underscore";
import Utils from "../Utils";
import Cards from "./Cards";
import Charts from "./Charts/Index";
import Overview from "./Overview";
import Table from "./Table/Index";

function Widgets(props) {
    const { config } = props;
    let components = config ? _.keys(Utils.sortOrder(config._order)) : []
    return (
        <div className="widgets-wrapper" >
            {
                _.map(components, component => {
                    let type = config[component].type
                    switch (type) {
                        case "overview":
                            return <Overview config={config[component]}/>
                        case "card":
                            return <Cards config={config[component]}/>
                        case "chart":
                            return <Charts config={config[component]}/>
                        case "table":
                            return <Table config={config[component]}/>
                        default:
                            break;
                    }
                })
            }
        </div>
    )
}
export default Widgets