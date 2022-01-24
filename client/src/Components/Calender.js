//========================== Import Modules Start ===========================

import React, { useState } from 'react';
import Calender from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import queryString from "query-string";
import { useDispatch} from 'react-redux';
import { AddEvent } from '../actions/userActions';
import { useHistory } from 'react-router-dom';

//========================== Import Modules End =============================

//============================= Calender Component Start =============================

const CalenderCilent = () => {

    //============================= Get Id =============================

    const dispatch = useDispatch();

    const {id} = queryString.parse(window.location.search);

    console.log("id: ", id)
    // //============================= Set Event =============================
    // const [addEvent, setAddEvent] = useState(false);

    const history = useHistory();
    //============================= Set Note =============================
    const [note, setNote] = useState("");

    //============================= Set Date =============================
    const [eventDate, setEventDate] = useState("")

    //============================= Handle Date Change =============================
    const handleDateChange = (date) => {
        setEventDate(date);
        // setAddEvent(true);
    }
    console.log("date: ", eventDate)
    //============================= Add Note =============================
    const addNote = () => {
        // setNote("");
        console.log(id, note, eventDate)
        //dispatch(AddEvent(note, eventDate, id))
        history.push('/Dashboard')
    }
    
  return (
      <>
      <form >

      <Calender onChange= {handleDateChange} value={new Date()}/>
        {/* {
            addEvent ? (
                <> */}
                    <input className='my-5 text-left' name='event' value={note} onChange={(e) => setNote(e.target.value)}/>
                    <button onSubmit = {addNote}  type="submit">Add Note</button>
                {/* </>
            ) : null
        } */}

      </form>
        
      </>
  );
};

//============================= Calender Component End =============================

//============================= Export Default Start =============================

export default CalenderCilent;

//============================= Export Default End =============================