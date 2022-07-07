import defaultSupplierConfig from "./defaultSupplierConfig";
import defaultBuyerConfig from "./defaultBuyerConfig";
import WebUtils from "../WebUtils";
export function login(data) {
    return function (dispatch, getState) {
        dispatch({ type: 'APP_LOADER', data: true});
        // WebUtils.loadUserDetails(data).then((response) => {
        //     if(response && response.status == 200 && response.data && response.data.authenticated) {
        //         let userList = [
        //             {  
        //                 username:"John Doe",
        //                 email:"admin@mail.com",
        //                 user_role: "admin",
        //                 account_type: "supplier",
        //                 config_name:"default_supplier"
        //             },
        //             {
        //                 username:"John Doe",
        //                 email:"customer@mail.com",
        //                 user_role: "admin",
        //                 account_type: "buyer",
        //                 config_name:"default_buyer"
        //             }
        //         ]
        //         dispatch({ type: 'LOGIN', data:  {
        //             username: response.data.customerName,
        //             email:"customer@mail.com",
        //             user_role: "admin",
        //             account_type: "buyer",
        //             config_name:"default_buyer",
        //             ...response.data,
        //         }});
        //     } else {
        //         dispatch({ type: 'LOGIN_FAILED', message: "User not found"});
        //     }

        // })
        
      
        let userList = [
            {  
                username:"John Doe",
                email:"admin@mail.com",
                user_role: "admin",
                account_type: "supplier",
                config_name:"default_supplier"
            },
            {
                username:"John Doe",
                email:"customer@mail.com",
                user_role: "admin",
                account_type: "buyer",
                config_name:"default_buyer"
            }
        ]
        setTimeout(() => {
            let password = "demo"
            let userIndex  = userList.findIndex(r => r.email == data.email)
            if(userIndex != -1 && data.password === password) {
                dispatch({ type: 'LOGIN', data: userList[userIndex]});
            } else {
                dispatch({ type: 'LOGIN_FAILED', message: "User not found"});
            }
        }, 1000);
    }
}
export function logout() {
    return function (dispatch, getState) {
        dispatch({ type: 'LOGOUT'});
    }
}
export function getUserConfig(configName, curPage, curView, appliedFilters) {
    return function (dispatch, getState) {
        // WebUtils.fetchUserConfig(configName).then((response) => {
        //     if(response && response.status == 200) {
        //         dispatch({ type: 'USER_CONFIG', data: response.data.data});
        //     }
        // })
        if(configName == "default_supplier") {
            dispatch({ type: 'USER_CONFIG', data: defaultSupplierConfig, curPage, curView, appliedFilters});
        } else if(configName == "default_buyer") {
            dispatch({ type: 'USER_CONFIG', data: defaultBuyerConfig, curPage, curView, appliedFilters});
        }   
    }
}

export function applyFilters(appliedFilters) {
    return function (dispatch, getState) {
        dispatch({ type: 'APPLY_GLOBAL_FILTERS', appliedFilters: appliedFilters});
    }
}
export function changePageView(curPage, curView) {
    return function (dispatch, getState) {
        dispatch({ type: 'CHANGE_PAGE_VIEW', curPage, curView});
    }
}

export function changeConfig(params) {
     return function (dispatch, getState) {
        dispatch({ type: params.action, ...params});
    }
}

export function setOverlay(params) {
       return function (dispatch, getState) {
        dispatch({ type: "SET_OVERLAY", ...params});
    }
}