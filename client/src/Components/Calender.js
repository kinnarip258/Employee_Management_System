//========================== Import Modules Start ===========================

import React, { useEffect, useState } from 'react';
import Calender from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import queryString from "query-string";
import { useDispatch, useSelector } from 'react-redux';

//========================== Import Modules End =============================

//============================= Calender Component Start =============================

const CalenderCilent = () => {

    //============================= Get Id =============================
    const {id} = queryString.parse(window.location.search);

    //============================= Get Employee Data =============================
    const user = useSelector(state => state.user)

    //============================= Set Event =============================
    const [addEvent, setAddEvent] = useState(false);

    //============================= Set Note =============================
    const [note, setNote] = useState("");

    //============================= Set Date =============================
    const [eventDate, setEventDate] = useState("")

    //============================= Employee Object =============================
    const [employeeObject, setEmployeeObject] = useState([]);

    //============================= Handle Date Change =============================
    const handleDateChange = (date) => {
        setEventDate(date);
        setAddEvent(true);
    }

    //============================= Add Note =============================
    const addNote = () => {
        setNote("");
        console.log(id, employeeObject, note, eventDate)
    }

    //============================= UseEffect =============================
    useEffect(() => {
        const employee = user.find((ele) => ele._id === id ? ele : null);
        setEmployeeObject(employee);
        console.log("employee: ", employee)
    }, [id]);
    
  return (
      <>
        <Calender onChange= {handleDateChange} value={new Date()}/>
        {
            addEvent ? (
                <>
                    <input className='my-5 text-left' onChange={e => setNote(e.target.value)}/>
                    <button onClick={() => addNote()}>Add Note</button>
                </>
            ) : null
        }
      </>
  );
};

//============================= Calender Component End =============================

//============================= Export Default Start =============================

export default CalenderCilent;

//============================= Export Default End =============================