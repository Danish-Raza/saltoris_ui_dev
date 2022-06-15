import { Select } from 'antd';
import React from 'react';
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
  let sortOrder = _.keys(Utils.sortOrder(config._order))
  _.map(sortOrder, order => {
    children.push(<Option key={config[order].display} value={order}>{config[order].display}</Option>);
  })
  return (
    <Select
      mode="tags"
      dropdownMatchSelectWidth={false}
      placeholder="Select"
      onChange={handleChange}
      showArrow={true}
  >
    {children}
  </Select>
  
  )
}

export default DropDown;