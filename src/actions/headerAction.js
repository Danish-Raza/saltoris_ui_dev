import WebUtils from "../WebUtils";
export function changeStatus(data) {
    return function (dispatch, getState) {
        if(data.operation == "Update Line Items") {
            dispatch({ type: 'MAKE_EDITABLE', data: data,  editable: true})
        } else {
            dispatch({ type: 'MAKE_EDITABLE', data: data, editable: false})
        }
    }
}