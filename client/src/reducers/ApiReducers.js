//========================== Import Modules Start ===========================

//========================== Import Modules End =============================

//========================== InitialState Start ===========================

const initialState = {
    user: [],
    page: [],
    Country: [], 
    States: [],
    City: [],  
    LoginState: true
}

//========================== InitialState End =============================


//============================= Reducers Start =============================

const ApiReducers = (state = initialState, action) => {
    switch (action.type) {

        case "Register_User":

            return {
                ...state,
                LoginState: true
            }

        case "Save_Update": 
        
            return {
                ...state,
            }

        case "Login_User":
            
            return {
                ...state,
                LoginState: false
            }

        case "Delete_User":
            
            return  {
                ...state,   
            }

        case "Get_UserDetails":

            return {
                ...state,
                user: action.payload.users,
                page: action.payload.totalPage,
                Country: action.payload.countries,
                States: action.payload.states,
                City: action.payload.cities
            }

        case "Get_CountryStateCity":

            return {
                Country: action.payload.countries,
                States: action.payload.states,
                City: action.payload.cities
            }
    
        case "Logout_User":
            
            return {
                LoginState: true
            }
        case "CheckCookie":

        return {
            LoginState: action.payload
        }
        default:
            return state;
    }
}

//============================= Reducers End =============================

//============================= Export Default Start =============================

export default ApiReducers;

//============================= Export Default End =============================