import { useState, useRef, useEffect } from "react";
import  _ from "underscore";
import Utils from "../Utils";
import Cards from "./Cards";
import Charts from "./Charts/Index";
import FormGroup from "./FormGroup";
import Overview from "./Overview";
import Table from "./Table/Index";

function Widgets(props) {
    const { curPage, curValue, appData } = props;
    const [components, setComponents] = useState([])
    const [config, setConfig] = useState(props.config)
    const [isEditable, setIsEditable] = useState(false)
    let [draggedItem,setDraggedItem] = useState(null)
    const widgetsWrapper = useRef();

    let _components = config && config._order ? _.keys(Utils.sortOrder(config._order)) : []
    const handleDrop = (ev) => {
        let dragBoxIndex = null
        let dropBoxIndex = null
        let dragBox = null
        let dropBox =  null
        let field = null
        let detailPanelChildren = widgetsWrapper.current.children;
        for (let i = 0; i < detailPanelChildren.length; i++) {
            field = detailPanelChildren[i].getAttribute("data-field")
            if (detailPanelChildren[i].id === draggedItem) {
                let _componentsIndex =  _.findIndex(components, r => config[r].id==draggedItem)
                dragBoxIndex = _componentsIndex
                dragBox = _componentsIndex!=-1 ?  components[_componentsIndex]: null
            }
            if (detailPanelChildren[i].id === ev.currentTarget.id) {
                let _componentsIndex =  _.findIndex(components, r => config[r].id==ev.currentTarget.id)
                dropBoxIndex = _componentsIndex
                dropBox = _componentsIndex!=-1 ?  components[_componentsIndex]: null
            }
        }
        let modOrder =  [...components]
        if(dragBoxIndex != -1 && dropBoxIndex != -1 && dragBox) {
            modOrder.splice(dragBoxIndex, 1)
            modOrder.splice(dropBoxIndex, 0, dragBox )
            setComponents(modOrder)
            setDraggedItem(null)
        }
    }

    const handleDrag = (ev) => {
        setDraggedItem(ev.currentTarget.id);
    }

    const toggleIsEditable = () => {
        setIsEditable(!isEditable)
    }

    return (
        <div
            className="widgets-wrapper"  
            ref={widgetsWrapper}
            onDragOver={(event) => {
                event.stopPropagation();
                event.preventDefault();
            }}
        >
            {
                _.map(_components, (component, componentIndex) => {
                    let type = config[component].type
                    switch (type) {
                        case "overview":
                            return <Overview
                            toggleIsEditable={toggleIsEditable} 
                            isEditable={isEditable} 
                            config={config[component]} 
                            handleDrop={handleDrop} 
                            handleDrag={handleDrag}
                            componentIndex={componentIndex} />
                        case "card":
                            return <Cards
                            key={config[component].id + "-" + JSON.stringify(appData.appParams)}
                            isEditable={isEditable} 
                            config={config[component]} 
                            handleDrop={handleDrop} 
                            handleDrag={handleDrag}
                            componentIndex={componentIndex} />
                        case "chart":
                            return <Charts 
                            key={ config[component].id + "-" + JSON.stringify(appData.appParams)}
                            isEditable={isEditable} 
                            config={config[component]} 
                            handleDrop={handleDrop} 
                            handleDrag={handleDrag}
                            componentIndex={componentIndex}/>
                        case "table":
                            return <Table  
                            key={ config[component].id + "-" + JSON.stringify(appData.appParams)}
                            isEditable={isEditable} 
                            config={config[component]} 
                            handleDrop={handleDrop} 
                            handleDrag={handleDrag}
                            componentIndex={componentIndex} />
                        case "form-group":
                            return <FormGroup
                            key={ config[component].id + " " + JSON.stringify(appData.appParams)}
                            isEditable={isEditable} 
                            config={config[component]} 
                            handleDrop={handleDrop} 
                            handleDrag={handleDrag}
                            componentIndex={componentIndex} />
                        default:
                            break;
                    }
                })
            }
        </div>
    )
}
export default Widgets