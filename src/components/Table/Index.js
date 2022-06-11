import _ from "underscore"
import Utils from "../../Utils";
import Header from "../Header";
import { Space, Table, Tag } from 'antd';
import cellHandler from "./CellHandler";

function TableComponent(props) {
    const { config } = props;
    const { columns, width }  = config
   // let sortedOrder = _.keys(Utils.sortOrder(columns._order))
    const sortHandler = () => {

    }
    const paginationHandler = () => {
        
    }

    const data = [
        {
          key: '1',
          name: 'John Brown',
          value: 32,
          requirement:"Type I",
          due_date: "2022-10-09",
          address: 'New York No. 1 Lake Park',
          status: 'Send',
          invoice_no: "#123"
        },
        {
          key: '2',
          name: 'Jim Green',
          value: 42,
          requirement:"Type I",
          due_date: "2022-10-09",
          address: 'London No. 1 Lake Park',
          status: 'Payments',
          invoice_no: "#124"
        },
        {
          key: '3',
          name: 'Joe Black',
          value: 32,
          requirement:"Type I",
          due_date: "2022-10-09",
          address: 'Sidney No. 1 Lake Park',
          status: 'Approved',
          invoice_no: "#125"
        }, 
        {
            key: '4',
            name: 'Joe',
            value: 32,
            requirement:"Type I",
            due_date: "2022-10-09",
            address: 'Sidney No. 1 Lake Park',
            status: 'Rejected',
            invoice_no: "#126"
          }
    ];
    //   const columns = [
    //     {
    //       title: 'Name',
    //       dataIndex: 'name',
    //       key: 'name',
    //       render: (text) => <a>{text}</a>,
    //     },
    //     {
    //       title: 'Age',
    //       dataIndex: 'age',
    //       key: 'age',
    //     },
    //     {
    //       title: 'Address',
    //       dataIndex: 'address',
    //       key: 'address',
    //     },
    //     {
    //       title: 'Tags',
    //       key: 'tags',
    //       dataIndex: 'tags',
    //       render: (_, { tags }) => (
    //         <>
    //           {tags.map((tag) => {
    //             let color = tag.length > 5 ? 'geekblue' : 'green';
      
    //             if (tag === 'loser') {
    //               color = 'volcano';
    //             }
      
    //             return (
    //               <Tag color={color} key={tag}>
    //                 {tag.toUpperCase()}
    //               </Tag>
    //             );
    //           })}
    //         </>
    //       ),
    //     },
    //     {
    //       title: 'Action',
    //       key: 'action',
    //       render: (_, record) => (
    //         <Space size="middle">
    //           <a>Invite {record.name}</a>
    //           <a>Delete</a>
    //         </Space>
    //       ),
    //     },
    //   ];
    const columnConfig = cellHandler(columns)
    return (
        <div className="widget table-wrapper" style={{width: width}}>
            <Header config={config}/>
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