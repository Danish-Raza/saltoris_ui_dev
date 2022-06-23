import { useDispatch } from "react-redux";
import _ from "underscore";
import { changeConfig } from "../actions/appActions";
import Utils from "../Utils";
import Header from "./Header";
import { Radio, Space } from 'antd';
import { useEffect, useState } from "react";
import moment from "moment";
import Icon from "../Icon";
import { Button, Popover } from 'antd';

function Cards(props) {
    const {  config, handleDrop, handleDrag, isEditable, componentIndex, componentDontExist } = props;
    const {display, width, template} = config;
    const dispatch = useDispatch();
    const [markedValue, setMarkedValue] = useState();
    const [data, setData] = useState([])
    const [originData, setOriginalData] = useState([])
    const [selectedFilter, setSelectedFilter] = useState()
    useEffect(() =>{
        const _mockData = [
            {
                name: "Artem Sazonov",
                short_text: "Codedellaroute Project",
                long_text: "Hey Cak, Could you free now? Can you look and read the brief first…",
                image: "",
                status: "unread",
                time: moment().format("MMM Do, h:mm a")
            },
            {
                name: "Jaroslav Brabec",
                short_text: "Website Redesign",
                long_text: "Hey Cak, Could you free now? Can you look and read the brief first…",
                image: "",
                status: "archive",
                time: moment().format("MMM Do, h:mm a")
            },
            {
                name: "Ren Xue",
                short_text: "Fone Dynamics Website",
                long_text: "Hey Cak, Could you free now? Can you look and read the brief first…",
                image: "",
                status: "archive",
                time: moment().format("MMM Do, h:mm a")
            },
            {
                name: "Jaroslav Brabec",
                short_text: "Website Redesign",
                long_text: "Hey Cak, Could you free now? Can you look and read the brief first…",
                image: "",
                status: "unread",
                time: moment().format("MMM Do, h:mm a")
            },
            {
                name: "Ren Xue",
                short_text: "Fone Dynamics Website",
                long_text: "Hey Cak, Could you free now? Can you look and read the brief first…",
                image: "",
                status: "read",
                time: moment().format("MMM Do, h:mm a")
            },
        ]
        let tempArray = _mockData.filter(rec => rec.status == "archive")
        let tempArray2 = _mockData.filter(rec => rec.status != "archive")
        // _.map(_mockData, rec => {
        //     if(rec.status== "archive") {
        //         tempArray.push(rec)
        //     }
        // })
        setData([...tempArray2, ...tempArray])
        setOriginalData(_mockData)
    }, [])
  
    let sortOrder = _.keys(Utils.sortOrder(config._order));
    let imageElemIndex = _.findIndex(sortOrder, order => config[order].type == "image");
    let imagePosition = imageElemIndex != -1 ? config[sortOrder[imageElemIndex]].position: null;
    const onChange = (e) => {
        setMarkedValue(e.target.value);
       // filterData("status", e.target.value)
    };
    

    const filterData = (key, value) => {
        let result = []
        if(!value) {
            setData(originData)
            setSelectedFilter(null)
        } else {
            _.map(originData, rec => {
                if(rec[key] == value) {
                    result.push(rec)
                }
            })
            setData(result)
            setSelectedFilter(value)
        }
        
    }

    const changeSatus = (index, value) => {
        let result = [...data]
        result[index].status = value
        if(value == "archive") {
           let tempObject =  result[index]
           result.splice(index,1)
           result.push(tempObject)
        }
        setData(result)
    }

    const content = (
        <div className="card-misc-option">
            <p data-status={selectedFilter == "read"} onClick={()=> filterData("status", "read")}>Read</p>
            <p data-status={selectedFilter == "unread"} onClick={()=> filterData("status", "unread")}>Unread</p>
            <p data-status={selectedFilter == "archive"} onClick={()=> filterData("status", "archive")}>Archive</p>
            <p className="reset-option" data-status={selectedFilter !== undefined && selectedFilter !== null ? true:    false} onClick={()=> filterData("status", null)}>Reset</p>
        </div>
    );
    return (
        <div 
            className="card-component-wrapper"
            data-template={template||"default_template"} 
            data-componentDontExist={componentDontExist}

        >
            {/* <Header isEditable={isEditable} config={config} /> */}
            <div className="card-wrapper-title">
                {display}
                {isEditable ? <div className="remove-button" onClick={()=>dispatch(changeConfig({action:"REMOVE_WIDGET", id: config.id }))}>-</div>:""}
                {isEditable && config.replicate && <div className="replicate-button" onClick={()=> dispatch(changeConfig({action:"REPLICATE_WIDGET",component: config, index: componentIndex})) }>+</div>}
                <Popover className="card-icon" placement="bottomRight" title={false} content={content} trigger="hover">
                    <Button>
                        <Icon type="three-dots"/> 
                    </Button>
                </Popover>
            </div>
            <div className="card-wrapper-body" style={{height: 320, overflowY:"auto"}}>
            {
                _.map(data, (rec, _index) => {
                    return (
                        <div className="card-wrapper">
                             <div className="card">
                                {rec.status == "unread" && <Icon type="eye-crossed" width={15} height={15}/>}
                                {
                                    imagePosition == "left" && 
                                        <div className="image">
                                        </div>
                                }
                                {
                                        <div className="card-content">
                                        {
                                          rec.time && <div>{rec.time}</div>  
                                        }
                                        {
                                            _.map(sortOrder, order => {
                                                if(config[order].type !== "image") {
                                                    return (
                                                        <div data-point={order}>
                                                            {config[order].display ? Utils.injectData(config[order].display, rec): ""}
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        </div>
                                   }
                                {
                                    imagePosition == "right" && <div className="image"></div>
                                }
                            </div>
                            <div className="mark-option">
                                <Radio.Group onChange={(e) => changeSatus(_index, e.target.value) }value={rec.status}>
                                    <Space direction="vertical">
                                        <Radio value={"read"}>Read</Radio>
                                        <Radio value={"unread"}>Unread</Radio>
                                        <Radio value={"archive"}>Archive</Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
export default Cards;