import Utils from "../Utils";
import _ from "underscore";

let initialState = {
  appLoading: false,
  authLoading: false,
  loggedIn: localStorage.getItem("saltoris-userD") ? true : false,
  userDetail: localStorage.getItem("saltoris-userD") ?  JSON.parse(localStorage.getItem("saltoris-userD")) : {},
  appParams: {appliedFilters: {}},
  error: false,
  errorMessage: null
}
export default function appReducer(state=initialState, action) {
    switch (action.type) {
      case "APP_LOADER":
        return {
          appLoading: false,
          authLoading: action.data,
          loggedIn: false,
          userDetail: {},
          appParams: {},
          error: false,
          errorMessage: null
        };
      case "LOGIN":
        localStorage.setItem("saltoris-userD", JSON.stringify(action.data))
        return {
          appLoading: false,
          loggedIn: true,
          authLoading: false,
          userDetail: action.data,
          appParams: {},
          error: false,
          errorMessage: null
        };
      case "LOGIN_FAILED":
        return {
          appLoading: false,
          loggedIn: false,
          userDetail: null,
          appParams: {},
          error: true,
          authLoading: false,
          errorMessage: action.message
        };
      case "LOGOUT":
          localStorage.removeItem("saltoris-userD")
          return {
            appLoading: false,
            authLoading: false,
            loggedIn:  false,
            userDetail: null,
            appParams: {},
            error: false,
            errorMessage: null
          };
      case "USER_CONFIG":
        let curPage;
        let curView;
        if(action.curPage) {
          curPage = action.curPage
        } else {
          let sortedOrder = _.keys(Utils.sortOrder(action.data._order))
          curPage = sortedOrder[0]

        }

        if(action.curView) {
          curView = action.curView
        } else {
          let sortedOrder = _.keys(Utils.sortOrder(action.data[curPage]._order))
          curView = sortedOrder[0]
        }
        return {
          ...state,
          appParams: {curPage: curPage, curView: curView, appliedFilters: action.appliedFilters || {}},
          userConfig: action.data
        };
      case "CHANGE_PAGE_VIEW":
       // window.history.replaceState(null, "", `/?cur_page=${action.curPage}&cur_view=${action.curView}`)
        return {
          ...state,
          appParams: {...state.appParams, curPage: action.curPage, curView: action.curView, appliedFilters: {}},
        };
      case "APPLY_GLOBAL_FILTERS":
        let modFilters = { ...state.appParams.appliedFilters, ...action.appliedFilters}
        let obj = {}
        _.map(modFilters, (value,key) => {
          if(value !== null && value !== undefined && value !== "") {
            obj={...obj,[key]: value}
          }
        })
        return {
          ...state,
          appParams: {...state.appParams,  appliedFilters: { ...obj}},
        };
      case "REPLICATE_WIDGET":
        let modConfig = {...state.userConfig};
        let modOrder = _.keys(Utils.sortOrder(modConfig[state.appParams.curPage][state.appParams.curView].widgets._order));
        let _index = _.findIndex(modOrder, o => o == action.component.id)
        let key = '';
        if(_index !== -1) {
          key = `${action.component.id}-index_${_index + 1}`;
          modOrder.splice(_index+1, 0, key);
          let _obj = {};
          _.map(modOrder, (o,_i) => {
            _obj={..._obj, [o]: _i}
          })
          modOrder=_obj;
        }
        modConfig[state.appParams.curPage][state.appParams.curView].widgets._order=modOrder;
        modConfig[state.appParams.curPage][state.appParams.curView].widgets[key] = { ...action.component, id: key, replicate: true};
        modConfig[state.appParams.curPage][state.appParams.curView].widgets[action.component.id].replicate = false;
        return {
          ...state,
          userConfig:  modConfig
        };
      case "REMOVE_WIDGET":
        let _modConfig = {...state.userConfig};
        let _modOrder = _.keys(Utils.sortOrder(_modConfig[state.appParams.curPage][state.appParams.curView].widgets._order));
        let _i = _.findIndex(_modOrder, o => o == action.id)
        if(_i !== -1) {
          _modOrder.splice(_i, 1);
          let _obj = {};
          _.map(_modOrder, (o,_i) => {
            _obj={..._obj, [o]: _i}
          })
          _modOrder=_obj;
        }
        _modConfig[state.appParams.curPage][state.appParams.curView].widgets._order=_modOrder;
        
        return {
          ...state,
          userConfig:  _modConfig
        };
      default:
        return state;
    }
  };