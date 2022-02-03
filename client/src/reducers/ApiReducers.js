//========================== Import Modules Start ===========================

import {Register_User, Save_Update, Edit_User, Login_User, Delete_User, Get_UserDetails, Logout_User, Get_CountryStateCity, CheckCookie} from "../actions/actionTypes"

//========================== Import Modules End =============================

//========================== InitialState Start ===========================

const initialState = {
    user: [],
    edituser : [],
    page: [],
    Country: [], 
    States: [],
    City: [],  
    LoginState: true
}

//========================== InitialState End =============================

//============================= Reducers Start =============================

const Reducers = (state = initialState, action) => {
    switch (action.type) {

        case Register_User:
            return {
                ...state,
            }

        case Save_Update: 
        
            return {
                ...state,
            }

        case Login_User:

            return {
                ...state,
                LoginState: false
            }

        case Delete_User:
            
            return  {
                ...state,
                LoginState: action.payload  
            }

        case Get_UserDetails:

            return {
                ...state,
                user: action.payload.users,
                page: action.payload.totalPage,
            }

        case Get_CountryStateCity:

            return {
                Country: action.payload.countries,
                States: action.payload.states,
                City: action.payload.cities
            }
    
        case Logout_User:
            
            return {
                LoginState: true
            }

        case CheckCookie:
            
        return {
            LoginState: action.payload
        }
        default:
            return state;
    }
}

//============================= Reducers End =============================

//============================= Export Default Start =============================

export default Reducers;

//============================= Export Default End =============================