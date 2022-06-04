let initialState = {
  appLoading: false,
  authLoading: false,
  loggedIn: localStorage.getItem("saltoris-userD") ? true : false,
  userDetail: localStorage.getItem("saltoris-userD") ?  JSON.parse(localStorage.getItem("saltoris-userD")) : {},
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
          error: false,
          errorMessage: null
        };
      case "LOGIN_FAILED":
        return {
          appLoading: false,
          loggedIn: false,
          userDetail:{},
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
            userDetail: {},
            error: false,
            errorMessage: null
          };
      default:
        return state;
    }
  };