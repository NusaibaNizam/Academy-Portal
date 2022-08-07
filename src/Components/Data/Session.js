import React from 'react';
import "./Data.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { faEdit, faTrashCan, faClock} from '@fortawesome/free-solid-svg-icons'
import {useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const Session = (props) => {
    const {auth}=useAuth()
    const axiosPrivate=useAxiosPrivate()
    const navigate=useNavigate()

    const getWeekDay=(day)=>{
        if(day===1)
            return 'Monday'
        else if(day===2)
            return 'Tuesday'
        else if(day===3)
            return 'Wednesday'
        else if(day===4)
            return 'Thursday'
        else if(day===5)
            return 'Friday'
    }

    const handleDelete=()=>{
        axiosPrivate.delete("http://localhost:8080/api/"+props.typeUrl+"/?id="+props.id)
        .then(response=>{
            props.setIsDeleted(true)
        }).catch(e=>{
            console.log(e)
            navigate("/error")
        })
    }
    return (
        <>
            <div className="userCard">
                <div className="imgContainer">
                    <FontAwesomeIcon icon={faClock} size='3x' className='cardTopIcon'/>
                </div>
                <div className="userContainer">
                    <div className="detailsContainer">

                        <h1>Topic:&nbsp;{props?.name}</h1>
                        {<div className='details'>Start Time: {props?.startingTime}</div>}
                        {<div className='details'>End Time: {props?.endingTime}</div>}
                        <div className='details'>Course: {props?.course?.name}</div>
                        <div className='details'>Weekday: {getWeekDay(props?.weekDay)}</div>
                    </div>
                    <div className="buttonContainer">
                    {
                        auth?.role.includes('admin')&&
                        <Link className="btn" to='/edit_session' 
                            state={{id:props.id, startingTime:props.startingTime, endingTime:props.endingTime,
                            course:props.course, name:props.name, weekDay:props.weekDay}}>
                                <FontAwesomeIcon icon={ faEdit} size="1x" />
                        </Link>
                    }
                    {auth?.role.includes('admin')&&<button className="btn" target="Delete student?" onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan} size="1x" /></button>}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Session;