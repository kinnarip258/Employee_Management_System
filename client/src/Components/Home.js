//========================== Import Modules Start ===========================

import React from "react";
import { useSelector } from "react-redux";

//========================== Import Modules End =============================

//============================= Home Component Start =============================

const Home = () => {

    const LoginUser = useSelector(state => state.LoginUser)

    return (
        <>
            <div className="header_div">

                {LoginUser ? <h1>{`Welcome ${LoginUser.fname} ${LoginUser.lname}`}</h1> : <h1> Welcome </h1>}
                
            </div>
        </>
    )
}

//============================= Home Component End =============================

//============================= Export Default Start =============================

export default Home;

//============================= Export Default End =============================