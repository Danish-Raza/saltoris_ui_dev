import defaultSupplierConfig from "./defaultSupplierConfig";
import defaultBuyerConfig from "./defaultBuyerConfig";
import defaultCustomerConfig from "./defaultCustomerConfig";
import WebUtils from "../WebUtils";
export function login(data) {
    return function (dispatch, getState) {
        dispatch({ type: 'APP_LOADER', data: true})

        WebUtils.loadUserDetails(data).then((response) => {
            if(response && response.status == 200 && response.data) {
                dispatch({ type: 'LOGIN', data:  {
                    username: response.data.firstName + " " + response.data.lastName,
                    email: response.data.email,
                    user_role: response.data.businessRole,
                    account_type: response.data.accountType || "supplier",
                    // config_name:"default_supplier",
                    ...response.data,
                }});
            } else {
                dispatch({ type: 'LOGIN_FAILED', message: "User not found"});
            }
        }, error => dispatch({ type: 'LOGIN_FAILED', message: "Something went wrong"}))
        
      
        // let userList = [
        //     {  
        //         username:"John Doe",
        //         email:"supplier@mail.com",
        //         user_role: "admin",
        //         account_type: "supplier",
        //         config_name:"default_supplier"
        //     },
        //     {  
        //         username:"John Doe",
        //         email:"buyer@mail.com",
        //         user_role: "admin",
        //         account_type: "buyer",
        //         config_name:"default_buyer"
        //     },
        //     {
        //         username:"John Doe",
        //         email:"customer@mail.com",
        //         user_role: "admin",
        //         account_type: "customer",
        //         config_name:"default_customer",
        //         client_logo: "customer"
        //     }
        // ]
        // setTimeout(() => {
        //     let password = "demo"
        //     let userIndex  = userList.findIndex(r => r.email == data.email)
        //     if(userIndex != -1 && data.password === password) {
        //         dispatch({ type: 'LOGIN', data: userList[userIndex]});
        //     } else {
        //         dispatch({ type: 'LOGIN_FAILED', message: "User not found"});
        //     }
        // }, 1000);
    }
}
export function logout() {
    return function (dispatch, getState) {
        dispatch({ type: 'LOGOUT'});
    }
}
export function getUserConfig(configName, curPage, curView, appliedFilters, userDetails) {
    return function (dispatch, getState) {
        if(userDetails.account_type == "supplier") {
            let modCOnfig = {...defaultSupplierConfig}
            modCOnfig["business_analytics"]["dashboard"] = userDetails.userSpecificConfig["dashboard"]
            dispatch({ type: 'USER_CONFIG', data: modCOnfig, curPage, curView, appliedFilters});
        } else if(userDetails.account_type == "buyer") {
            let modCOnfig = {...defaultBuyerConfig}
            modCOnfig["business_analytics"]["dashboard"] = userDetails.userSpecificConfig["dashboard"]
            dispatch({ type: 'USER_CONFIG', data: userDetails.userSpecificConfig, curPage, curView, appliedFilters});
        } else if(userDetails.account_type == "customer") {
            let modCOnfig = {...defaultCustomerConfig}
            modCOnfig["business_analytics"]["dashboard"] = userDetails.userSpecificConfig["dashboard"]
            dispatch({ type: 'USER_CONFIG', data: userDetails.userSpecificConfig, curPage, curView, appliedFilters});
        } 
        
        // if(configName == "default_supplier") {
        //     dispatch({ type: 'USER_CONFIG', data: userDetails.userSpecificConfig, curPage, curView, appliedFilters});
        // } else if(configName == "default_buyer") {
        //     dispatch({ type: 'USER_CONFIG', data: defaultBuyerConfig, curPage, curView, appliedFilters});
        // } else if(configName == "default_customer") {
        //     dispatch({ type: 'USER_CONFIG', data: defaultCustomerConfig, curPage, curView, appliedFilters});
        // }   
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

export function setTableRowData(params) {
    return function (dispatch, getState) {
     dispatch({ type: "SET_TABLE_ROW_DATA", ...params});
 }
}