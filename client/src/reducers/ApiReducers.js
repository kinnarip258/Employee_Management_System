const initialState = {
    user: [],
    searchUser: [],
    LoginState: true
}


const ApiReducers = (state = initialState, action) => {
    switch (action.type) {

        case "Register_User":

            return {
                ...state,
            }

        case "Save_Update": 
        
            return {
                ...state,
                user: action.payload   
            }

        case "Login_User":
            
            return {
                ...state,
                user: [action.payload],
                LoginState: false
            }

        case "Delete_User":
            
            return  {
                ...state,
                LoginState: false   
            }

        case "getUserDetails_User":
            
            return {
                ...state,
                user: action.payload ,
            }

        case "Logout_User":
            
            return {
                LoginState: false
            }

        case "Search_User":
            
            return {
                user: action.payload 
            }

        case "Ascending_Name":
            
            return {
                user: action.payload 
            }

        case "Descending_Name":
            return {
                user: action.payload
            }

        default:
            return state;
    }
}

export default ApiReducers;