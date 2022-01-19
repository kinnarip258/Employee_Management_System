//========================== Load Modules Start ===========================

import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from 'redux-thunk';
import ApiReducers from './reducers/ApiReducers';

//========================== Load Modules End =============================

//============================= Store Start =============================

//debug the application's state changes
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); 

//createstore
//pass the reducer
//ReduxThunk as middleware
//compose middleware and composeEnhancers
const store = createStore(
    ApiReducers,
    compose(applyMiddleware(ReduxThunk), composeEnhancers)
)

//============================= Store End =============================

//============================= Export Default Start =============================

export default store;

//============================= Export Default End =============================
