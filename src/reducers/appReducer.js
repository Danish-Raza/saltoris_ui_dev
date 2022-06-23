import Utils from "../Utils";
import _ from "underscore";
import moment from "moment";

let initialState = {
  appLoading: false,
  authLoading: false,
  loggedIn: localStorage.getItem("saltoris-userD") ? true : false,
  userDetail: localStorage.getItem("saltoris-userD") ?  JSON.parse(localStorage.getItem("saltoris-userD")) : {},
  appParams: {appliedFilters: {}},
  error: false,
  errorMessage: null,
  overlay: {
    show: false,
    components: null
  }
}
export default function appReducer(state=initialState, action) {
  let actionType = action.type
  if (actionType == "APP_LOADER") {
    return {
      appLoading: false,
      authLoading: action.data,
      loggedIn: false,
      userDetail: {},
      appParams: {},
      error: false,
      errorMessage: null
    };
  } else if (actionType == "LOGIN") {
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
  } else if (actionType == "LOGIN_FAILED") {
    return {
      appLoading: false,
      loggedIn: false,
      userDetail: null,
      appParams: {},
      error: true,
      authLoading: false,
      errorMessage: action.message
    };
  } else if (actionType == "LOGOUT") {
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
  } else if (actionType == "USER_CONFIG") {
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
  } else if (actionType == "CHANGE_PAGE_VIEW") {
     return {
      ...state,
      appParams: {...state.appParams, curPage: action.curPage, curView: action.curView, appliedFilters: {}},
    };
  } else if (actionType == "APPLY_GLOBAL_FILTERS") {
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
  } else if (actionType == "REPLICATE_WIDGET") {
    let modConfig = {...state.userConfig};
    let modOrder = _.keys(Utils.sortOrder(modConfig[state.appParams.curPage][state.appParams.curView].widgets._order));
    let _index = _.findIndex(modOrder, o => o == action.component.id)
    let key = '';
    if(_index !== -1) {
      let time = moment().format('mm_ss_a'); 
      key = `${action.component.id}-index_${_index + 1}-${time}`;
      modOrder.splice(_index+1, 0, key);
      let _obj = {};
      _.map(modOrder, (o,_i) => {
        _obj={..._obj, [o]: _i}
      })
      modOrder=_obj;
    }
    modConfig[state.appParams.curPage][state.appParams.curView].widgets._order=modOrder;
    modConfig[state.appParams.curPage][state.appParams.curView].widgets[key] = { ...action.component, id: key, replicate: true};
   //  modConfig[state.appParams.curPage][state.appParams.curView].widgets[action.component.id].replicate = false;
    return {
      ...state,
      userConfig:  modConfig
    };
  } else if (actionType == "ADD_WIDGET") {
      let _modConfig = {...state.userConfig};
      let _modOrder = _.keys(Utils.sortOrder(_modConfig[state.appParams.curPage][state.appParams.curView].widgets._order));
      _modOrder.splice(action.index,0, action.id);
      let _obj = {};
      _.map(_modOrder, (o,_i) => {
        _obj={..._obj, [o]: _i}
      })
      _modOrder=_obj;
      _modConfig[state.appParams.curPage][state.appParams.curView].widgets._order=_modOrder;
      return {
        ...state,
        userConfig:  _modConfig
      };
  } else if (actionType == "REMOVE_WIDGET") {
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
  } else if (actionType == "CHANGE_WIDGET_ORDER") {
    let dragBoxIndex = null
    let dropBoxIndex = null
    let dragBox = null
    let dropBox =  null
    let detailPanelChildren = action.widgetsWrapper.current.children;
    let _modConfig = {...state.userConfig};
    let components =  _.keys(Utils.sortOrder(_modConfig[state.appParams.curPage][state.appParams.curView].widgets._order));
    for (let i = 0; i < detailPanelChildren.length; i++) {
      if (detailPanelChildren[i].id === action.draggedItem) {
      //  detailPanelChildren[i].dataTransfer.setData("text", action.ev.currentTarget.id);
       // document.getElementById(action.ev.currentTarget.id).innerHTML = "working";
       action.ev.dataTransfer.setData('text/plain', 'This text may be dragged') 
        let _componentsIndex =  _.findIndex(components, r => _modConfig[state.appParams.curPage][state.appParams.curView].widgets[r].id == action.draggedItem)
        dragBoxIndex = _componentsIndex
        dragBox = _componentsIndex!=-1 ?  components[_componentsIndex]: null
      }
      if (detailPanelChildren[i].id === action.ev.currentTarget.id) {
        let _componentsIndex =  _.findIndex(components, r => _modConfig[state.appParams.curPage][state.appParams.curView].widgets[r].id==action.ev.currentTarget.id)
        dropBoxIndex = _componentsIndex
        dropBox = _componentsIndex!=-1 ?  components[_componentsIndex]: null
      }
    }
    let modOrder =  [...components]
    if(dragBoxIndex != -1 && dropBoxIndex != -1 && dragBox) {
      modOrder.splice(dragBoxIndex, 1)
      modOrder.splice(dropBoxIndex, 0, dragBox)

      let _obj = {};
      _.map(modOrder, (o,_i) => {
        _obj={ ..._obj, [o]: _i}
      })
      modOrder=_obj;
      
      _modConfig[state.appParams.curPage][state.appParams.curView].widgets._order = modOrder;
      return {
        ...state,
        userConfig:  _modConfig
      };
    }
  } else if (actionType == "SET_OVERLAY") {
    return {
      ...state,
      overlay:  {
        show: action.show,
        components: action.overlay,
        dependentData: action.dependentData
      }
    };
  } else{
    return state;
  }
};