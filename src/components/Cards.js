import { useDispatch } from "react-redux";
import _ from "underscore";
import { changeConfig } from "../actions/appActions";
import Utils from "../Utils";
import Header from "./Header";

function Cards(props) {
    const {  config, handleDrop, handleDrag, isEditable } = props;
    const {display, width, template} = config;
    const dispatch = useDispatch()
    const data = [
        {
            name: "Artem Sazonov",
            short_text: "Codedellaroute Project",
            long_text: "Hey Cak, Could you free now? Can you look and read the brief first…",
            image: ""
        },
        {
            name: "Jaroslav Brabec",
            short_text: "Website Redesign",
            long_text: "Hey Cak, Could you free now? Can you look and read the brief first…",
            image: ""
        },
        {
            name: "Ren Xue",
            short_text: "Fone Dynamics Website",
            long_text: "Hey Cak, Could you free now? Can you look and read the brief first…",
            image: ""
        },
        {
            name: "Jaroslav Brabec",
            short_text: "Website Redesign",
            long_text: "Hey Cak, Could you free now? Can you look and read the brief first…",
            image: ""
        },
        {
            name: "Ren Xue",
            short_text: "Fone Dynamics Website",
            long_text: "Hey Cak, Could you free now? Can you look and read the brief first…",
            image: ""
        },
    ]
    let sortOrder = _.keys(Utils.sortOrder(config._order));
    let imageElemIndex = _.findIndex(sortOrder, order => config[order].type == "image");
    let imagePosition = imageElemIndex != -1 ? config[sortOrder[imageElemIndex]].position: null;
    return (
        <div 
            className="card-wrapper" 
            style={{width: width || "100%"}} 
            data-template={template||"default_template"} 
            draggable={isEditable} 
            id={config.id}
            onDrop={handleDrop} 
            onDragStart={handleDrag}
            onDragOver={(event) => {
                // let event = e as Event;
                event.stopPropagation();
                event.preventDefault();
            }}
        >
            {/* <Header isEditable={isEditable} config={config} /> */}
            <div className="card-wrapper-title">
                {display}
                {isEditable?<div className="remove-button" onClick={()=>dispatch(changeConfig({action:"REMOVE_WIDGET", id: config.id }))}>x</div>:""}
            </div>
            <div style={{height: 310, overflowY:"auto"}}>
            {
                _.map(data, rec => {
                    return (
                            <div className="card">
                                {
                                    imagePosition == "left" && <div className="image"></div>
                                }
                                <div className="card-content">
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
                                {
                                    imagePosition == "right" && <div className="image"></div>
                                }
                            </div>
                    )
                })
            }
            </div>
            
            
        </div>
    )
    
}
export default Cards;