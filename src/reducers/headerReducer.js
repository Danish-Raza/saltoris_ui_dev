import Utils from "../Utils";
import _ from "underscore";
import moment from "moment";

let initialState = {
  
}
export default function headerReducer(state=initialState, action) {
  let actionType = action.type
  if (actionType == "MAKE_EDITABLE") {
    return {
     [action.data.tableId]: {
        isEditable: action.editable
     }
    };
  } else{
    return state;
  }
};