//========================== Import Modules Start ===========================

//========================== Import Modules End =============================

//========================== InitialState Start ===========================

const initialState = {
    user: [],
    page: [],    
    LoginState: true
}

//========================== InitialState End =============================


//============================= Reducers Start =============================

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
            
            return {
                ...state,
                user: action.payload.users,
                page: action.payload.totalPage
            }

        case "Logout_User":
            
            return {
                LoginState: true
            }

        default:
            return state;
    }
}

//============================= Reducers End =============================

//============================= Export Default Start =============================

export default ApiReducers;

//============================= Export Default End =============================