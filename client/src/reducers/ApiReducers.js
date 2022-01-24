//========================== Import Modules Start ===========================

//========================== Import Modules End =============================

//========================== InitialState Start ===========================

const initialState = {
    user: [],
    page: [],
    Country: [], 
    States: [],
    City: [],  
    LoginState: false
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

        case "Add_Event":
            console.log("action.payload ", action.payload)
            return {
                LoginState: true
            }

        case "get_Country":
            console.log("action.payload Country", action.payload)
            return {
                Country: action.payload
            }

        case "get_State":
            console.log("action.payload State", action.payload)
            return {
                States: action.payload
            }
    
        case "get_City":
            console.log("action.payload City", action.payload)
            return {
                City: action.payload
            }

        default:
            return state;
    }
}

//============================= Reducers End =============================

//============================= Export Default Start =============================

export default ApiReducers;

//============================= Export Default End =============================