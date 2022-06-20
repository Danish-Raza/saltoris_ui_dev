import _ from "underscore";
const sortOrder = (order) => {
    const sortable = Object.entries(order)
    .sort(([,a],[,b]) => a-b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    return sortable
}

const convertToList = (data, xAxis, yAxis, xyValue) => {
    let result = []
    _.map(data, rec => {
        let modRec = {...rec}
        delete modRec[xAxis]
        _.map(modRec, (value, key) => {
            result.push({
                [xAxis]: rec[xAxis],
                [yAxis]: value,
                [xyValue]: key
            })
        })
    })
    return result
}
const nFormatter = (num, digits=1) =>  {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
const injectData = (str , data) => {
    var stateItem = [];
    var r = str.match(/\{[\w]+\}/g);
    r && r.forEach((state) => {
      var regex = new RegExp(state, 'g');
      stateItem.push(state.split(/{|}/g)[1]);
    });

    let dPoints = stateItem.slice();
    let obj = {...data};
    if(dPoints.length > 0) {
      let parsedString = dPoints.reduce( (accString, string) => {
        let value = obj[string];
        accString = accString.replace('{' + string + '}', `${value}`);
        return accString;
      }, str);
      return parsedString;
    } else {
      return str;
    }
//    return stateItem;
}

const returnSuccessfullObject= (checkConditions, data, sendAll=null) => {
  let object = null;
  let checks = checkConditions;
  let information = data;
  try {
    let sorted = _.keys(sortOrder(checks._order));
    for(let i = 0; i < sorted.length; i++) {
      let sortedData = sorted[i];
      let condition = checks[sortedData].condition;
      let key = checks[sortedData].key
      let modData = {...data}
      if(key) {
        if(typeof data[key] == "object" && data[key].length === undefined) {
          if(checks[sortedData].key_to_pick) {
            modData={...modData, ...data[key][checks[sortedData].key_to_pick]}
          } else {
            modData={...modData, ...data[key]}
          }
        } else if(typeof data[key] == "object" && data[key].length !== undefined){
          let keyToPick = checks[sortedData].key_to_pick
          let valueToPick = checks[sortedData].value_to_pick
          let ob = _.find(data[key], rec => rec[keyToPick] == valueToPick)
          if(ob) {
            modData = { ...modData, ...ob}
          }
        }
      }
      let conditionString = injectData(condition, modData)
      let boolean = new Function('return ' + conditionString)();
      if(boolean) {
        if(sendAll == "all") {
          object = !object ? [] : object ;
          object.push(checks[sortedData]);
        } else {
          object = {};
          object = checks[sortedData];
          break;
        }
      }
    }
  } catch (e) {

  }
  return object;
}
  
export default {
    sortOrder,
    convertToList,
    nFormatter,
    injectData,
    returnSuccessfullObject
}