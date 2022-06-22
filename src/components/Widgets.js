import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import  _ from "underscore";
import { changeConfig } from "../actions/appActions";
import Utils from "../Utils";
import Cards from "./Cards";
import Charts from "./Charts/Index";
import FormGroup from "./FormGroup";
import Overview from "./Overview";
import Table from "./Table/Index";

function Widgets(props) {
    const { curPage, curValue, appData, config } = props;
    const widgetsWrapper = useRef();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({})
    const [isEditable, setIsEditable] = useState(false)
    const [draggedItem, setDraggedItem] = useState(null)

    let components = config && config._order ? _.keys(Utils.sortOrder(config._order)) : []

    const handleDrop = ev => {
        dispatch(changeConfig({action:"CHANGE_WIDGET_ORDER", widgetsWrapper, ev, draggedItem }));
        setDraggedItem(null);
    }

    const dataFromForm = data => {
        let modData = {...formData, ...data}
        setFormData(modData)
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
                _.map(components, (component, componentIndex) => {
                    let type = config[component].type;
                    let propertyDependsOn = config[component].property_depends_on;
                    let showComponent = true
                    let componentKey = config[component].id + "-" + JSON.stringify(appData.appParams)
                    let dependentData = {}

                    if(propertyDependsOn) {
                        if(formData[propertyDependsOn]) {
                            showComponent=true;
                           // componentKey = componentKey + "-" + JSON.stringify(formData[propertyDependsOn]);
                            dependentData = {...formData[propertyDependsOn]}
                        } else {
                            if(config[component].render_initial) {
                                showComponent = true;
                            } else {
                                showComponent = false;
                            }
                        }
                    }

                    let commonProps = {
                        key: componentKey,
                        id: component.id || component,
                        isEditable: isEditable,
                        config: config[component],
                        handleDrop: handleDrop,
                        handleDrag: handleDrag,
                        componentIndex: componentIndex,
                        dependentData: dependentData,
                    }

                    switch (type) {
                        case "overview":
                            delete commonProps.key
                            return showComponent && <Overview {...commonProps} toggleIsEditable={toggleIsEditable} />
                        case "card":
                            return showComponent && <Cards {...commonProps} />
                        case "chart":
                            return showComponent && <Charts {...commonProps} />
                        case "table":
                            return showComponent && <Table {...commonProps} />
                        case "form-group":
                            return showComponent && <FormGroup {...commonProps} onSubmit={dataFromForm} />
                        case "tab":
                            return showComponent && <FormGroup {...commonProps} onSubmit={dataFromForm} />
                        default:
                            break;
                    }
                })
            }
        </div>
    )
}
export default Widgets