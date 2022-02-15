//========================== Import Modules Start ===========================

import React from "react"; 
import "./App.css";
import Navbar from "./Components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { useSelector } from "react-redux";
//========================== Import Modules End =============================

//============================= App Start =============================

const App = () => {

    const LoginState = useSelector(state => state.LoginState);
    useEffect(() => {

    }, [LoginState])
    return (
        <>
            <Navbar/>
            <AppRoutes/>                                       
        </>      
    )
}

//============================= App End =============================

//============================= Export Default Start =============================

export default App;

//============================= Export Default End =============================