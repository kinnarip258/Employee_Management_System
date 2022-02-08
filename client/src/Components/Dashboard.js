//========================== Import Modules Start ===========================

import React, { useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Get_UserDetails, Delete_User} from "../actions/userActions";
import Pagination from '@mui/material/Pagination';
import debounce from "lodash.debounce";

//========================== Import Modules End =============================

//============================= Dashboard Component Start =============================

const Deshboard = () => {

    //============================= dispatch Api Search =============================
    const dispatch = useDispatch();

    //============================= Get Response Of The Api =============================
    const user = useSelector(state => state.user);

    //============================= Get Response Of The Api =============================
    const LoginUser = useSelector(state => state.LoginUser);

    //============================= Get Response Of The Api =============================
    const deleteToggle = useSelector(state => state.deleteToggle);
    
    //============================= Pagination =============================
    const page = useSelector(state => state.page);

    const [pageNumber, setPageNumber] = useState(1);

    //============================= For Different Request =============================

    const [Search, setSearch] = useState("");

    const [sort, setSort] = useState("ascending")

    //============================= Delete Employee =============================
    const handleDelete = (email) => {
        
        if(window.confirm("Are You Sure")){
            dispatch(Delete_User(email))        
        }
    }
    
    //============================= handle Search =============================
    const handleSearch = (e) => {
        setPageNumber(1)
       setSearch(e.target.value)
    }
   
    //============================= Optimise Search Employee =============================
    const optimiseVersion = debounce(handleSearch, [500])

    //============================= useEffect =============================
    
    useEffect(() => {
        //============================= Get Employee Data =============================
        dispatch(Get_UserDetails(pageNumber, sort, Search));

    }, [pageNumber, sort, Search, dispatch, deleteToggle]);


    return(
        <>
            <div className='main_div'>

                {/* <div className='col-md-12 my-3 text-center'>
                    <h1>{LoginUser && (`Welcome ${LoginUser.fname} ${LoginUser.lname}`)}</h1>
                </div> */}

                <div className='col-md-12 my-3 text-center'>
                    <h1>Employee Data</h1>
                </div>
                <div className='col-md-15 my-3 text-center'>
                    <input className='col-md-2 my-1 text-left' onKeyUp={optimiseVersion} placeholder="Search Employee..."/>
                </div>

                <div className='col-md-12 my-3 text-left'>
                    <select onChange={(e) => setSort(e.target.value)}>
                        <option>Sorting</option>
                        <option value={"ascending"}>Acending</option>
                        <option value={"descending"}>Descending</option>
                    </select>
                </div>

                {
                    page !== 0 ? (
    
                        <div className='col-md-20 mx-auto'>
                            <table className='table table-hover'>
                                <thead className='text-black text-center'>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Company</th>
                                        <th>Profession</th>
                                        <th>Salary 1st month</th>
                                        <th>Salary 2nd month</th>
                                        <th>Salary 3rd month</th>
                                        <th>Total Salary</th>
                                        <th>Country</th>
                                        <th>State</th>
                                        <th>City</th>
                                        <th>Edit</th>
                                        <th>Delete</th>                 
                                    </tr>
                                </thead>  
                                <tbody>
                                {
                                    user && (
                                        user.map(ele => {
                                            return(     
                                                <tr key = {ele.id}>          
                                                    <td>{ele.fname}</td>
                                                    <td>{ele.lname}</td>
                                                    <td>{ele.email}</td>
                                                    <td>{ele.phone}</td>
                                                    <td>{ele.company}</td>
                                                    <td>{ele.profession}</td>
                                                    <td>{ele.salary1}</td> 
                                                    <td>{ele.salary2}</td>
                                                    <td>{ele.salary3}</td>
                                                    <td>{ele.totalSalary}</td>
                                                    <td>{ele.CountryName.map((ele) => ele.CountryName)}</td>
                                                    <td>{ele.StateName.map((ele) => ele.StateName)}</td>
                                                    <td>{ele.CityName.map((ele) => ele.CityName)}</td>
                                                    <td><button class="page-link"><NavLink to={`/EditUser/:?id=${ele._id}`}>Edit</NavLink></button></td>
                                                    <td><button class="page-link" onClick={() => handleDelete(ele.email)}>Delete</button></td>     
                                                </tr>                
                                            )
                                        })
                                    ) 
                                }
                                </tbody>
                            </table>

                            <Pagination count={page} variant="outlined" color="secondary" onChange={(e, value) =>  {
                                setPageNumber(value) }}/>  

                        </div>
                
                    ) : (
                        <div>
                            <h1>NO DATA FOUND</h1>
                        </div>
                    )
                }
     
            </div>     
        </>
    )
    
        
};

//============================= Dashboard Component End =============================

//============================= Export Default Start =============================

export default Deshboard;

//============================= Export Default End =============================
