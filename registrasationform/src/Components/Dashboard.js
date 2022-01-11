import React, { useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getUserDetailsUser, DeleteUser, SearchUser} from "../actions/userActions";

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

    const [searchUser, setSearchUser] = useState("");
    console.log("searchUser: ", searchUser)
    return(
        <>
            <div className="main_div">
                <div className="header_div">
                        <h1>Employee Data</h1>
                </div>
                <div className="search_div">
                    <input onChange={(e) => setSearchUser(e.target.value)} value={searchUser} placeholder="search Employee..."/>
                    <button onClick={() => {ApiDispatch(SearchUser(searchUser))}}> Search </button>
                </div>
                <hr/>
                <div className="data_index">
                    <table style={{"width" : "100%"}}>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Company</th>
                            <th>Profession</th>
                            <th>Salary</th>
                            <th>Edit</th>
                            <th>Delete</th>                 
                        </tr>
                    </table>

                </div>
                <hr/>
                <div className="show_data">
                
                    {
                        user.map(ele => {
                            return(
                                <div className = "eachitem" key = {ele.id}>
                                    <table style={{"width" : "100%"}}>
                                        <tr>          
                                            <td>{ele.fname} </td>
                                            <td>{ele.lname}</td>
                                            <td>{ele.email}</td>
                                            <td>{ele.phone}</td>
                                            <td>{ele.company}</td>
                                            <td>{ele.profession}</td>
                                            <td>{ele.salary}</td> 
                                            <td><NavLink to={`/editUser/:?id=${ele._id}`}><button>Edit</button></NavLink></td>
                                            <td><button onClick={() => handleDelete(ele._id)}>Delete</button></td>     
                                        </tr>     
                                        
                                    </table>   
                                </div>
                        
                            )
                        })
                    }
                    </div>

                    <div className="pagination">
        
                        <a onClick={() => ApiDispatch(getUserDetailsUser(1))}>1</a>
                        <a onClick={() => ApiDispatch(getUserDetailsUser(2))}>2</a>
                        <a onClick={() => ApiDispatch(getUserDetailsUser(3))}>3</a>
            
                    </div>
            </div>
        </>
    )


};

export default Deshboard;