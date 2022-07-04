import { useState,useEffect } from "react";
import Utils from "../../Utils";
import _ from "underscore"
import supplierDashboard from "../../mockData/supplierDashboard";
import WebUtils from "../../WebUtils";
import Line from "./Line";
import DropDown from "./DropDown";
import Header from "../Header";
import moment from "moment";
import { useSelector } from "react-redux";

function Charts(props) {
    const { config, handleDrag, handleDrop, isEditable, componentIndex, componentDontExist } = props;
    let appData = useSelector(state => state.appData)
    const { chart_type, dropdown, title, api, params, width, id } = config;
    const [data, setData] = useState([]);
    const [oiginal,setOriginal] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState([])

    useEffect(() => {
        let defaultDropdown = dropdown ? dropdown.default: null;
        let params = {}
        if(defaultDropdown) {
            let sortedOrder = _.keys(Utils.sortOrder(defaultDropdown._order))
            let dropdownKey = dropdown.key
            let mode = dropdown.mode
            params = {
                [dropdownKey]: mode == "select" ? sortedOrder[0]: sortedOrder
            }
        }
        setLoading(true)
        updateChart(params)
    },[])

    const getData = () => {

    }

    const updateChart = async(params) => {
        // let resData = supplierDashboard["chart_1"]
        let startDate = null
        let endDate = null
        
        if(appData.appParams.appliedFilters) {
            let mapping = {
                "90 Days": 90,
                "30 Days": 30,
                "7 Days": 7
            }
            startDate = moment().subtract(mapping[appData.appParams.appliedFilters.date_range], 'days');
            endDate = moment()
            startDate = new Date(startDate.format("YYYY-MM-DD"));
            endDate= new Date(endDate.format("YYYY-MM-DD"));
        }
        
    
        let resData = []
        let counter = 1;
        while(startDate <= endDate){         
            resData.push(
                {
                    "date": moment(startDate).format("YYYY-MM-DD"),
                    "Bid": `2122${counter}`,
                    "Payments": `23412${counter}`,
                    "Invoices": `2122${counter}`,
                    "Purchase Orders": `3232${counter}`,
                    "Dispatch":`233${counter}`,
                    "Quality":`3223${counter}`,
                    "Rejections":`1231${counter}`
                },
            )
            counter++
            let newDate = startDate.setDate(startDate.getDate() + 1);
            startDate = new Date(newDate);
         }

        await WebUtils.httpOperations(api, params, "GET")
        .then(response =>  {
            setLoading(false)
            let filteredData = []
            _.map(params,(valO, k) => {
                _.map(resData, rec => {
                    let modRec = {}
                    _.map(valO, val => {
                        modRec={ ...modRec, [val]: rec[val]}
                    })
                    modRec.date = rec.date
                    filteredData.push(modRec)
                })
            })
            setData(filteredData)
            setOriginal(resData)
            setSelectedOption(params)
        }, error =>  {
            setData(resData)
            setLoading(false)
            setSelectedOption(params)
        })
    }

    const dropDownHandler = (key,value) => {
        updateChart({[key]: value})
    }
    return (
        <div 
            className="chart-wrapper widget" 
            style={{ 
            height:"auto"}}
            data-componentDontExist={componentDontExist}
        >
            <Header  
                componentIndex={componentIndex} 
                config={{...config }}
                isEditable={isEditable} 
                onChange={dropDownHandler}
                selectedOption={selectedOption}
            />
            {
                chart_type == "line" && <Line config={config} data={data}/>
            }
        </div>
    )
}
export default Charts;