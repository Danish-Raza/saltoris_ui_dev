import { useState,useEffect } from "react";
import Utils from "../../Utils";
import _ from "underscore"
import supplierDashboard from "../../mockData/supplierDashboard";
import WebUtils from "../../WebUtils";
import Line from "./Line";
import DropDown from "./DropDown";
import Header from "../Header";

function Charts(props) {
    const { config, handleDrag, handleDrop, isEditable,removeHandler, replicateHandler, componentIndex } = props;
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
        let resData = supplierDashboard["chart_1"]
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

    const dropDownHandler = () => {

    }

    return (
        <div 
            className="chart-wrapper widget" 
            style={{width: width || "100%", 
            height:"auto"}}
            id={config.id}
            draggable={isEditable}
            onDrop={handleDrop} 
            onDragStart={handleDrag}
            onDragOver={(event) => {
                event.stopPropagation();
                event.preventDefault();
            }}
        >
            <Header 
                replicateHandler={replicateHandler} 
                componentIndex={componentIndex} 
                config={config}
                isEditable={isEditable} 
                removeHandler={removeHandler}
                onChange={dropDownHandler}
            />
            {
                chart_type == "line" && <Line config={config} data={data}/>
            }
        </div>
    )
}
export default Charts;