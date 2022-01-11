
const initialState = {
    user: [],
    LoginState: false,
    editUser: []
}


const ApiReducers = (state = initialState, action) => {
    switch (action.type) {

        case "Register_User":

            return {
                ...state,
            }

        case "Save_Update": 
        console.log("use data from save update reducers", action.payload)
            return {
                ...state,
                user: [action.payload]
                
            }

        case "Login_User":
            
            return {
                ...state,
                user: [action.payload],
                LoginState: true
            }

        case "Delete_User":
            
            return  {
                ...state,
                LoginState: false   
            }

        case "getUserDetails_User":
            console.log("use data from deshboard reducers", action.payload)
            return {
                ...state,
                user: action.payload ,
                LoginState: true
            }

        case "Logout_User":
            
            return {
                LoginState: false
            }

        case "Search_User":
            console.log("use data from search reducers", action.payload)
            return {
                user: action.payload
            }
    

        default:
            return state;
    }
}

export default ApiReducers;