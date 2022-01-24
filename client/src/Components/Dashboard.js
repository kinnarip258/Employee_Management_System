//========================== Import Modules Start ===========================

import React, { useCallback, useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getUserDetailsUser, DeleteUser} from "../actions/userActions";
import Pagination from '@mui/material/Pagination';

//========================== Import Modules End =============================

//============================= Dashboard Component Start =============================

const Deshboard = () => {

    //============================= dispatch Api Request =============================
    const dispatch = useDispatch();

    //============================= Get Response Of The Api =============================
    const user = useSelector(state => state.user)

    //============================= Pagination =============================
    const page = useSelector(state => state.page);
    const [pageNumber, setPageNumber] = useState(1);

    //============================= For Different Request =============================
    const [request, setRequest] = useState("Employees");

    //============================= Delete Employee =============================
    const handleDelete = (id) => {
        dispatch(DeleteUser(id));
    }
    
    //============================= handle Search =============================
    const handleSearch = (e) => {
       setRequest(e.target.value)
    }
   
    //============================= Debouncing =============================
    const debounce = (func) => {
        let timer;
        return function (...args){
            const context = this;
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args);

            }, 500)
        }
    }
    
    //============================= Optimise Search Employee =============================
    const optimiseVersion = useCallback(debounce(handleSearch), [])

    //============================= useEffect =============================
    useEffect(() => {
        dispatch(getUserDetailsUser(pageNumber, request))  
    }, [pageNumber,request])
    
    return(
        <>
            <div className='main_div'>
                <div className='col-md-12 my-3 text-center'>
                    <h1>Employee Data</h1>
                </div>
                <div className='col-md-15 my-3 text-center'>
                    <input className='col-md-1 my-1 text-left' onKeyUp={optimiseVersion} placeholder="Search Employee..."/>
                </div>

                <div className="col-md-10 my-1 text-right">
                    <label className="col-md-2 my-1 text-left">City</label>
                    <select className="col-md-2 my-1 text-left" placeholder="City"> 
                        <option>Select City...</option>
                        <option>Rajkot</option>
                        <option>Surat</option>
                    </select>
                    <label className="col-md-2 my-1 text-left">State</label>
                    <select className="col-md-2 my-1 text-left" placeholder="State">
                        <option>Select State...</option>
                        <option>Gujarat</option>
                        <option>Delhi</option>
                    </select>
    
                    <label className="col-md-2 my-1 text-left">Country</label>
                    <select className="col-md-2 my-1 text-left" placeholder="Country">
                        <option>Select Country...</option> 
                        <option>India</option>
                        <option>USA</option>
                    </select>
                </div>
                <div className='col-md-20 mx-auto'>
                    <button onClick={() => setRequest("ascending")} >Ascending</button>
                    <button onClick={() => setRequest("descending")}>Descending</button>
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
                                <th>Edit</th>
                                <th>Delete</th>                 
                            </tr>
                        </thead>  
                        <tbody>
                        {
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
                                        <td>{ele.salary1 + ele.salary2 + ele.salary3}</td>
                                        <td><button class="page-link"><NavLink to={`/EditUser/:?id=${ele._id}`}>Edit</NavLink></button></td>
                                        <td><button class="page-link" onClick={() => handleDelete(ele._id)}>Delete</button></td>     
                                    </tr>                
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>

                <Pagination count={page} variant="outlined" color="secondary" onChange={(e, value) =>  {
                    setPageNumber(value)  
                }}/>   
                    
            </div>     
        </>
    )
};

//============================= Dashboard Component End =============================

//============================= Export Default Start =============================

export default Deshboard;

//============================= Export Default End =============================
