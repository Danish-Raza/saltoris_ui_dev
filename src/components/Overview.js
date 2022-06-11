import Utils from "../Utils";
import _ from "underscore";
import Icon from "../Icon";
function Overview(props) {
    const { config={} } = props;
    const { display } = config;
    const data = [
        {
            title: "Invoices",
            previous_score:"$21350",
            difference: "2.5",
            gain: "27632"
        },
        {
            title: "Opportunities",
            previous_score:"$20119",
            difference: "-2.5",
            gain: "165"
        },
        {
            title: "Bid",
            previous_score:"$20119",
            difference: "2.5",
            gain: "165"
        },
        {
            title: "Payments",
            previous_score:"$20119",
            difference: "-2.5",
            gain: "165"
        }
    ] 
    let sortOrder = _.keys(Utils.sortOrder(config._order))
    return (
        <div className="overview">
            <div className="overview-wrapper-title">{display}</div>
           {
               _.map(data, rec => {
                   return (
                    <div className="overview-block">
                        {
                             _.map(sortOrder, order => {
                                if(config[order].multiple){
                                    let multipleOrder = _.keys(Utils.sortOrder(config[order].multiple._order))
                                    return (
                                        <div className="cell multiple"> 
                                            {
                                                _.map(multipleOrder, mOrder => {
                                                    if(config[order].multiple[mOrder].template=="arrow-up-down"){
                                                        return (
                                                            <div data-point={mOrder} data-template="arrow-up-down" data-positive={rec[mOrder] > 0 ? true: false}>
                                                                {rec[mOrder] > 0 ? "+" : "" }
                                                                {Utils.injectData(config[order].multiple[mOrder].display, rec)}
                                                                {rec[mOrder] < 0 ? <span>&#8595;</span>: <span>&#8593;</span>}
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div>{Utils.injectData(config[order].multiple[mOrder].display, rec)}</div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    )
             
                                } else {
                                 return (
                                        <div className="cell" data-point={order}>
                                            {Utils.injectData(config[order].display, rec)}
                                        </div>
                                    )
                                }
                            })

                        }
                    </div>
                   )
               })
           }
        </div>
    ) 
}
export default Overview;