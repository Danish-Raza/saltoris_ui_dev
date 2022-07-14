import { Select, Dropdown, Menu , Button} from 'antd';
import React, { useEffect, useState } from 'react';
import Utils from '../../Utils';
import _ from "underscore"
import Icon from '../../Icon';
import { setOverlay } from '../../actions/appActions';
import { useDispatch } from 'react-redux';
const { Option } = Select;


const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const getData = () => {

}

function DropDown(props) {
  const children = [];
  const { config, parentComponentData } =props;
  const [value, setValue] = useState(props.value);
  const dispatch = useDispatch()
  let template = config.template;

  let sortOrder = _.keys(Utils.sortOrder(config._order))
  _.map(sortOrder, order => {
    children.push(<Option key={config[order] ? config[order].display: order} value={order}>{config[order] ? config[order].display : order}</Option>);
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
      let onClick = () => {
        if(config[order].on_click ==  "overlay"){
          dispatch(setOverlay({
            overlay: config[order].overlay,
            dependentData: parentComponentData,
            show: true
          }))
        } else {
          props.onChange(config.key, order);
          setValue(order)
        }
      }
      items.push(
        {
          key: index,
          label: (
           <div onClick={onClick} data-active={value == order && !config[order].on_click ? true : false} key={order}> <span className='tick'></span> {config[order].display} </div>
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
      <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']} >
          <Button className='filter-icon-wrappper' > <Icon type="three-dots" width={15} height={15} styles={props.styles}/></Button>
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
        getPopupContainer={triggerNode => triggerNode.parentNode} 
        suffixIcon={typeof config.icon == "string" ? <Icon type={config.icon} width={15} height={15} /> : config.icon }
        value={value}
    >
      {children}
    </Select>
    )
 }
}

export default DropDown;