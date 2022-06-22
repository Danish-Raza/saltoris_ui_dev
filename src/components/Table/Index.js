import _ from "underscore"
import Utils from "../../Utils";
import Header from "../Header";
import { Space, Table, Tag } from 'antd';
import cellHandler from "./CellHandler";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOverlay } from "../../actions/appActions";

function TableComponent(props) {
    const { config, handleDrop, handleDrag, isEditable, componentIndex, dependentData } = props;
    const { columns, width }  = config;
    const [selectedOption, setSelectedOption] = useState({});
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const dispatch = useDispatch()

    const sortHandler = () => {

    }
    const paginationHandler = () => {
        
    }

   useEffect(() => {
    let defaultDropdown = config.dropdown ? config.dropdown.default: null;
    let params = {}
    if(defaultDropdown) {
        let sortedOrder = _.keys(Utils.sortOrder(defaultDropdown._order))
        let dropdownKey = config.dropdown.key
        let mode = defaultDropdown.mode
        params = {
            [dropdownKey]: mode == "select" ? sortedOrder[0]: sortedOrder
        }
        setSelectedOption(params)
    }
    const _mockData = [
        {
          key: '1',
          name: 'John Brown',
          buyer: 'John Brown',
          value: 32,
          customer_id: "c1",
          customer_name: "John Brown",
          po_id: "p1",
          material: "material 1",
          order_ammount: 32,
          requirement:"Type I",
          due_date: "2022-10-09",
          address: 'New York No. 1 Lake Park',
          status: 'Send',
          invoice_no: "#123",
          title:"title 1",
          category: "category 1",
          certifying_body: "body 1",
          editor:"Editor 1",
          version:"Version 2",
          dol:"DOL 1",
          dop:"DOP 2",
          isbn:"ISBN 1",
          in_house_publication: "Publication 1"
        },
        {
          key: '2',
          name: 'Jim Green',
          buyer: 'Jim Green',
          value: 42,
          order_ammount: 42,
          requirement:"Type I",
          due_date: "2022-10-09",
          customer_id: "c2",
          customer_name: "Jim Green",
          po_id: "p2",
          material: "material 2",
          address: 'London No. 1 Lake Park',
          status: 'Payments',
          invoice_no: "#124",
          title:"title 2",
          category: "category 2",
          certifying_body: "body 2",
          editor:"Editor 2",
          version:"Version 2",
          dol:"DOL 2",
          dop:"DOP 2",
          isbn:"ISBN 2",
          in_house_publication: "Publication 2"
        },
        {
          key: '3',
          name: 'Joe Black',
          buyer: 'Joe Black',
          value: 32,
          order_ammount: 32,
          requirement:"Type I",
          customer_id: "c3",
          customer_name: "Joe Black",
          po_id: "p3",
          material: "material 3",
          due_date: "2022-10-09",
          address: 'Sidney No. 1 Lake Park',
          status: 'Approved',
          invoice_no: "#125",
          title:"title 3",
          category: "category 3",
          certifying_body: "body 3",
          editor:"Editor 3",
          version:"Version 3",
          dol:"DOL 3",
          dop:"DOP 3",
          isbn:"ISBN 3",
          in_house_publication: "Publication 3"
        }, 
        {
            key: '4',
            name: 'Joe',
            buyer:"Joe",
            customer_id: "c4",
            customer_name: "Joe",
            po_id: "p4",
            material: "material 4",
            value: 32,
            order_ammount: 32,
            requirement:"Type I",
            due_date: "2022-10-09",
            address: 'Sidney No. 1 Lake Park',
            status: 'Rejected',
            invoice_no: "#126",
            title:"title 4",
            category: "category 4",
            certifying_body: "body 4",
            editor:"Editor 4",
            version:"Version 4",
            dol:"DOL 4",
            dop:"DOP 4",
            isbn:"ISBN 4",
            in_house_publication: "Publication 4"
          }
    ];
    setData(_mockData)
    setOriginalData(_mockData)
   },[])

   useEffect(() => {
        if(dependentData.po_id) {
            let filteredData = originalData.filter(rec => dependentData.po_id.includes(rec.po_id))
            if(filteredData && filteredData.length>0) {
                setData(filteredData)
            } else {
                setData(originalData)
            }
           
        }
   },[dependentData])
   let helperFuntion = {
        setOverlay: (params) => {
           return dispatch(setOverlay({...params}))
        }
   }
   
    const columnConfig = cellHandler(columns, selectedOption, helperFuntion)
    
    // const dropDownHandler = () => {

    // }
    const dropDownHandler = (key,value) => {
        setSelectedOption({[key]: value})
    }
    return (
        <div 
            className="widget table-wrapper" 
            style={{width: width}} id={config.id}
            draggable={isEditable}
            onDrop={handleDrop} 
            onDragStart={handleDrag}
            onDragOver={(event) => {
                // let event = e as Event;
                event.stopPropagation();
                event.preventDefault();
            }}
            >
            <Header 
                config={config}
                isEditable={isEditable} 
                onChange={dropDownHandler}
                componentIndex={componentIndex}
                selectedOption={selectedOption}
                
                />
            <Table dataSource={data} columns={columnConfig} />
            {/* {
                <table>
                    <thead>
                        <tr>
                            {
                                _.map(sortedOrder, order => <th>{columns[order].display}</th>)
                            }   
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                _.map(sortedOrder, order => <td>{columns[order].display}</td>)
                            } 
                        </tr>
                    </tbody>
                </table>

            } */}

        </div>
    )
}
export default TableComponent