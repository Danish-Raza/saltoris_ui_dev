import { Select, Dropdown, Menu , Button} from 'antd';
import React, { useEffect, useState } from 'react';
import Utils from '../../Utils';
import _ from "underscore"
import Icon from '../../Icon';
const { Option } = Select;


const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const getData = () => {

}

function DropDown(props) {
  const children = [];
  const { config } =props;
  const [value, setValue] = useState(props.value);
  let template = config.template;

  let sortOrder = _.keys(Utils.sortOrder(config._order))
  _.map(sortOrder, order => {
    children.push(<Option key={config[order].display} value={order}>{config[order].display}</Option>);
  })

  useEffect(() => {
    if(config.default && !value) {
      let sortOrder = _.keys(Utils.sortOrder(config.default._order))
      if(sortOrder && config.mode == "select") {
        setValue(sortOrder[0])
      } else {
        setValue(sortOrder)
      }
    }
  },[])

 
  
  if(template == "filter") {
    let items = []
    _.map(sortOrder, (order, index) => {
      items.push(
        {
          key: index,
          label: (
           <div onClick={() => {props.onChange(config.key, order); setValue(order)}} data-active={value == order ? true : false} key={order}> <span className='tick'></span> {config[order].display} </div>
          )
        }
      )
    })
    const menu = (
      <Menu
        items={items}
      />
    )
    
  //  return 
    return (
      <Dropdown overlay={menu} placement="bottom" trigger={['click']} >
          <Button className='filter-icon-wrappper' > <Icon type="filter" width={15} height={15}/></Button>
        {/* <Icon type="filter" width={15} height={15}/> */}
    </Dropdown>
    )
  } else {
    return (
      <Select
        mode={config.mode || "tags"}
        dropdownMatchSelectWidth={false}
        placeholder={config.placeholder ? config.placeholder: "Select"}
        onChange={(value) => { props.onChange(config.key,value); setValue(value)}}
        showArrow={true}
        showSearch={true}
        value={value}
    >
      {children}
    </Select>
    )
 }
}

export default DropDown;