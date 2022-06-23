import Utils from "../Utils";
import _ from "underscore";

function Information(props) {
    const { config } = props;
    const sortedOrder = _.keys(Utils.sortOrder(config._order))
    return(
        <div className="Information-wrapper">
            {
                _.map(sortedOrder, order => <div className="info-line" data-key={order} >{config[order].display}</div>)
            }

        </div>
    )
}
export default Information;