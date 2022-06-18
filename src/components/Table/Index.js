import _ from "underscore"
import Utils from "../../Utils";
import Header from "../Header";
import { Space, Table, Tag } from 'antd';
import cellHandler from "./CellHandler";

function TableComponent(props) {
    const { config, handleDrop, handleDrag, isEditable, removeHandler } = props;
    const { columns, width }  = config
   // let sortedOrder = _.keys(Utils.sortOrder(columns._order))
    const sortHandler = () => {

    }
    const paginationHandler = () => {
        
    }
    // "title": 1,
    // "requirement": 2,
    // "category": 3,
    // "editor": 4,
    // "version": 5,
    // "dol": 6,
    // "dop": 7,
    // "isbn":8,
    // "in_house_publication": 9,
    // "name": 5,
    const data = [
        {
          key: '1',
          name: 'John Brown',
          value: 32,
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
          value: 42,
          requirement:"Type I",
          due_date: "2022-10-09",
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
          value: 32,
          requirement:"Type I",
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
            value: 32,
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
    const columnConfig = cellHandler(columns)
    
    const dropDownHandler = () => {

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
                config={config} i
                sEditable={isEditable} 
                removeHandler={removeHandler}
                onChange={dropDownHandler}
                
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