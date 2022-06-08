import Utils from "../Utils";
import _ from "underscore";

let initialState = {
  appLoading: false,
  authLoading: false,
  loggedIn: localStorage.getItem("saltoris-userD") ? true : false,
  userDetail: localStorage.getItem("saltoris-userD") ?  JSON.parse(localStorage.getItem("saltoris-userD")) : {},
  appParams: {},
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
          appParams: {curPage: curPage, curView: curView},
          userConfig: action.data
        };
      case "CHANGE_PAGE_VIEW":
       // window.history.replaceState(null, "", `/?cur_page=${action.curPage}&cur_view=${action.curView}`)
        return {
          ...state,
          appParams: {...state.appParams, curPage: action.curPage, curView: action.curView},
        };
      default:
        return state;
    }
  };