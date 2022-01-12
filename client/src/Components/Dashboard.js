import React, { useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getUserDetailsUser, DeleteUser, SearchUser, AscendingName, DescendingName} from "../actions/userActions";

const Deshboard = () => {
    
    //dispatch the api request
    const ApiDispatch = useDispatch();
    //get response of the api request
    const user = useSelector(state => state.user)

    //navigate the page
    const history = useHistory();

    useEffect(() => {
        //dispatch getuserdetails request 
        ApiDispatch(getUserDetailsUser())
    }, [])
 
    //delete the user
    const handleDelete = (id) => {
        //dispatch deleteuser request
        ApiDispatch(DeleteUser(id));
        history.push("/Registration")
    }
    //searchUser state
    const [searchUser, setSearchUser] = useState("");
    
    return(
        <>
            <div className='main_div'>
                <div className='col-md-12 my-5 text-center'>
                    <h1>Employee Data</h1>
                </div>
                <div className='col-md-12 my-5 text-center'>
                    <input onChange={(e) => setSearchUser(e.target.value)} value={searchUser} placeholder="search Employee..."/>
                    <button onClick={() => {ApiDispatch(SearchUser(searchUser))}}> Search </button>
                </div>
                <hr/>
                <div className='col-md-12 mx-auto'>
                    <button onClick={() => ApiDispatch(AscendingName())}>Ascending</button>
                    <button onClick={() => ApiDispatch(DescendingName())}>Descending</button>
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
                                        <td><button><NavLink to={`/editUser/:?id=${ele._id}`}>Edit</NavLink></button></td>
                                        <td><button onClick={() => handleDelete(ele._id)}>Delete</button></td>     
                                    </tr>                
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>

                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" >Previous</a></li>
                        <li class="page-item"><a class="page-link" onClick={() => ApiDispatch(getUserDetailsUser(1))}>1</a></li>
                        <li class="page-item"><a class="page-link" onClick={() => ApiDispatch(getUserDetailsUser(2))}>2</a></li>
                        <li class="page-item"><a class="page-link" onClick={() => ApiDispatch(getUserDetailsUser(3))}>3</a></li>
                        <li class="page-item"><a class="page-link" >Next</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )


};

export default Deshboard;