import { useState,useEffect } from "react";
import Utils from "../../Utils";
import _ from "underscore"
import supplierDashboard from "../../mockData/supplierDashboard";
import WebUtils from "../../WebUtils";
import Line from "./Line";
import DropDown from "./DropDown";

function Charts(props) {
    const { config } = props;
    const { chart_type, dropdown, title, api, params, width, id } = config;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState([])

    useEffect(() => {
        let defaultDropdown = dropdown ? dropdown.default: null;
        let params = {}
        if(defaultDropdown) {
            let sortedOrder = _.keys(Utils.sortOrder(defaultDropdown._order))
            let dropdownKey = dropdown.key
            params = {
                [dropdownKey]: sortedOrder
            }
        }
        setLoading(true)
        updateChart(params)
    },[])

    const getData = () => {

    }

    const updateChart = async(params) => {
        let resData = supplierDashboard[id]
        await WebUtils.httpOperations(api, params, "GET")
        .then(response =>  {
            setData(resData)
            setLoading(false)
            setSelectedOption(params)
        }, error =>  {
            setData(resData)
            setLoading(false)
            setSelectedOption(params)
        })
    }

    return (
        <div className="chart-wrapper" style={{width: width || "100%"}}>
            {
                dropdown &&  <DropDown config={dropdown}/>
            }
            {
                chart_type == "line" && <Line config={config} data={data}/>
            }
        </div>
    )
}
export default Charts;