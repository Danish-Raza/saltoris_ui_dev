import _ from "underscore";

let initialState = {
  
}
export default function tableReducer(state=initialState, action) {
    let actionType = action.type
    if(!action.config) {
        return state
    }
    let tableId = action.tableId || action.config.id
    if (actionType == "SET_TABLE_DATA") {
        let modState = {...state}
        // nestedSelectedRow:[
        //     {
        //         parentRowIndex:'',
        //         rowIndex:'',
        //         rowKeyValue: {}
        //     }
        // ],
        if(action.init) {
            modState[tableId] = {
                dataSet: action.data,
                loading: false,
                selectedRow: [],
                dependentParams: {
                    currentPage: 1,
                    limit: action.config.limit || 10,
                    perPage: action.config.limit || 10,
                    sortOn: null,
                    sortBy: null,
                    search: null,
                    dropdownOptions: {},
                    filters: {}
                },
                config: action.config
            }
            if(action.activeKeysData){
                modState[tableId].selectedRow = action.activeKeysData
            }
            if(action.nestedSelectedRow) {
                modState[tableId].nestedSelectedRow = action.nestedSelectedRow
            }
        } else {
            modState[tableId] = {
                ...state[tableId],
                dataSet: action.data,
                loading: false
            }
        }
        return modState
    } else if (actionType == "CHANGE_TABLE_DATA") {
        let {data, rowIndex, parentColumn} = action;
        let modState = {...state}
        if(parentColumn) {
            let parentRowIndex = _.findIndex(modState[tableId].dataSet, rec => _.isEqual(rec, parentColumn))
            if(parentRowIndex != -1) {
                modState[tableId].dataSet[parentRowIndex].inner_table[rowIndex] = {
                    ...modState[tableId].dataSet[parentRowIndex].inner_table[rowIndex],
                    ...data
                }
            }
            if(modState[tableId].nestedSelectedRow) {
                let selectedObject = {
                    parentRowIndex: parentRowIndex,
                    rowIndex: rowIndex,
                    rowKeyValue: {...modState[tableId].dataSet[parentRowIndex].inner_table[rowIndex]}
                }
                let i = _.findIndex(modState[tableId].nestedSelectedRow, rec => rec.rowKeyValue.key == selectedObject.rowKeyValue.key)
                if(i == -1) {
                    modState[tableId].nestedSelectedRow.push(selectedObject)
                } else if(i != -1) {
                    modState[tableId].nestedSelectedRow[i] = selectedObject
                }
            } else {
                modState[tableId].nestedSelectedRow = [{
                    parentRowIndex: parentRowIndex,
                    rowIndex: rowIndex,
                    rowKeyValue: {...modState[tableId].dataSet[parentRowIndex].inner_table[rowIndex]}
                }]
            }
        } else {
            modState[tableId].dataSet[rowIndex] = {
                ...modState[tableId].dataSet[rowIndex],
                ...data
            }
            if(modState[tableId].selectedRow) {
                modState[tableId].selectedRow.push({
                  ...modState[tableId].dataSet[rowIndex]
                })
            } else {
                modState[tableId].selectedRow = [{
                    ...modState[tableId].dataSet[rowIndex]
                }]
            }
        }
        return modState;
    } else if (actionType == "SEARCH_TABLE") {
        let modState = {...state}
        modState[tableId] = {
            ...modState[tableId],
            dependentParams: {
                ...state[tableId].dependentParams,
                currentPage: 1,
                search: action.search,
                sortOn: null,
                sortBy: null
            },
            config: action.config
        }
        return modState
    } else if (actionType == "SORT_TABLE") {
        let modState = {...state}
        modState[tableId] = {
            ...modState[tableId],
            dependentParams: {
                ...state[tableId].dependentParams,
                sortOn: action.sortOn,
                sortBy: action.sortBy
            },
            config: action.config
        }
        return modState;
    } else if (actionType == "CHANGE_PAGE") {
        let modState = {...state}
        modState[tableId] = {
            ...modState[tableId],
            dependentParams: {
                ...state[tableId].dependentParams,
                currentPage: action.page 
            },
            config: action.config
        }
        return modState
    } else if (actionType == "CHANGE_PER_PAGE") {
        let modState = {...state}
        modState[tableId] = {
            ...modState[tableId],
            dependentParams: {
                ...state[tableId].dependentParams,
                currentPage: 1,
                limit: action.perPage,
                perPage: action.perPage
            },
            config: action.config
        }
        return modState
    } else if (actionType == "APPLY_FILTERS") {
        let modState = {...state}
        modState[tableId] = {
            ...modState[tableId],
            dependentParams: {
                ...state[tableId].dependentParams,
                filters: action.filters,
                currentPage: 1,
                sortOn: null,
                sortBy: null
            },
            config: action.config
        }
        return modState
    } else if (actionType == "CHANGE_LOADER_STATE") {
        state[tableId] = {
            ...state[tableId],
            loading: action.loading
        }
        return state
    } else if (actionType == "SWITCH_TABLE_ROW") {
        let { operation, rowIndex, column } = action;
        let modData =  [...state[tableId].dataSet];
        let switchData = column.data_key
        let displayKey = column.display_key
        let record = {...modData[rowIndex]}
        let curVersionIndex = record._curVersionIndex || 0;
        if(operation=="GO_FORTH") {
            curVersionIndex++;
            modData[rowIndex] = {...modData[rowIndex],...modData[rowIndex][switchData][curVersionIndex]};
            modData[rowIndex]._curVersionIndex = curVersionIndex;
        } else if(operation == "GO_BACK") {
            curVersionIndex-=1;
            modData[rowIndex] = {...modData[rowIndex],...modData[rowIndex][switchData][curVersionIndex]};
            modData[rowIndex]._curVersionIndex = curVersionIndex;
        }
        let modState = {...state}
        modState[tableId].dataSet = modData;
        return modState
    } else if (actionType == "SELECT_TABLE_ROW") {
        let selectData = _.filter(state[tableId].dataSet, rec => action.newSelectedRowKeys.includes(rec.key))
        let modState = {...state}
        modState[tableId].selectedRow = selectData
        return modState
    } else if (actionType == "SELECT_NESTED_TABLE_ROW") {
        let modState = {...state}
        let parentRecordIndex = _.findIndex(state[tableId].dataSet, rec => _.isEqual(rec, action.parentRecord))
        if(parentRecordIndex != -1) {
            let selectData = _.filter(state[tableId].dataSet[parentRecordIndex].inner_table, rec => action.newSelectedRowKeys.includes(rec.key))
            let modSelectData = []
            _.map(selectData, rec => {
                let rowIndex = _.findIndex(state[tableId].dataSet[parentRecordIndex].inner_table, r => _.isEqual(r,rec))
                modSelectData.push({
                    parentRowIndex: parentRecordIndex,
                    rowIndex: rowIndex,
                    rowKeyValue: rec
                })
            })
            modState[tableId].nestedSelectedRow = modSelectData
        }
        return modState
    } else {
        return state;
    }
};