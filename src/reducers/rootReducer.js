import { combineReducers } from 'redux';
import appReducer from './appReducer';
import headerReducer from "./headerReducer";
import tablesData from "./tableReducer";
export default combineReducers({
    appData: appReducer,
    headerData: headerReducer,
    tables: tablesData
});