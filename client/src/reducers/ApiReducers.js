const initialState = {
    user: [],
    page: [],
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
                user: [action.payload]  
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
                LoginState: true   
            }

        case "getUserDetails_User":
            console.log("action.payload:all ", action.payload)
            return {
                ...state,
                user: action.payload.users,
                page: action.payload.totalPage
            }

        case "Logout_User":
            
            return {
                LoginState: true
            }

        case "Search_User":
            console.log("action.payload:search ", action.payload)
            return {
                user: action.payload.users,
                page: action.payload.totalPage
            }

        case "Ascending_Name":
            console.log("action.payload: asc", action.payload)
            return {
                user: action.payload.users,
                page: action.payload.totalPage
            }

        case "Descending_Name":
            console.log("action.payload:desc ", action.payload)
            return {
                user: action.payload.users,
                page: action.payload.totalPage
            }

        default:
            return state;
    }
}

export default ApiReducers;