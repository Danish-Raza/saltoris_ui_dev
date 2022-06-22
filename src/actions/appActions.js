import mockConfig from "./mockConfig";
export function login(data) {
    return function (dispatch, getState) {
        // WebUtils.loadUserDetails(data).then((response) => {
        //     if(response && response.status == 200) {
        //       dispatch({ type: 'LOGIN', data: response.data.data});
        //     }
        //   })
        
        dispatch({ type: 'APP_LOADER', data: true});
        setTimeout(() => {
            let mockUserData = {
                username:"John Doe",
                email:"admin@mail.com",
                user_role: "admin",
                account_type: "supplier",
                config_name:"default_supplier"
            }
            let password = "demo"
            if(data.email === mockUserData.email && data.password === password){
                dispatch({ type: 'LOGIN', data: mockUserData});
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
            dispatch({ type: 'USER_CONFIG', data: mockConfig, curPage, curView, appliedFilters});
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