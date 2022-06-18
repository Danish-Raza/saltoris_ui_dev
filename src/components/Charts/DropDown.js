import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import Utils from '../../Utils';
import _ from "underscore"
const { Option } = Select;


const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const getData = () => {

}

function DropDown(props) {
  const children = [];
  const { config } =props
  const [value, setValue] = useState()

  useEffect(() => { 
    if(config.default) {
      let sortOrder = _.keys(Utils.sortOrder(config.default._order))
      if(sortOrder && config.mode == "select") {
        setValue(sortOrder[0])
      } else {
        setValue(sortOrder)
      }
    }
    

  },[])

  let sortOrder = _.keys(Utils.sortOrder(config._order))
  _.map(sortOrder, order => {
    children.push(<Option key={config[order].display} value={order}>{config[order].display}</Option>);
  })

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

export default DropDown;