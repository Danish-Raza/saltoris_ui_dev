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
  
export default {
    sortOrder,
    convertToList,
    nFormatter,
    injectData
}