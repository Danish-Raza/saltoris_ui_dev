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
                username:"Admin",
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
        }, 2000);
    }
}
export function logout() {
    return function (dispatch, getState) {
        dispatch({ type: 'LOGOUT'});
    }
}