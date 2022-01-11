import { SearchUser } from "../actions/userActions"

const initialState = {
    user: [],
    searchUser: [],
    LoginState: false,
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
            
            return {
                searchUser: action.payload,
                user: state.searchUser
            }
        default:
            return state;
    }
}

export default ApiReducers;