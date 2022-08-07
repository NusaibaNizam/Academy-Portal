import React from 'react';
import "./Data.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { faEdit, faTrashCan, faPencilRuler} from '@fortawesome/free-solid-svg-icons'
import {useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const Record = (props) => {
    const {auth}=useAuth()
    const axiosPrivate=useAxiosPrivate()
    const navigate=useNavigate()
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
                    <FontAwesomeIcon icon={faPencilRuler} size='3x' className='cardTopIcon'/>
                </div>
                <div className="userContainer">
                    <div className="detailsContainer">

                        <h1>{props?.name}</h1>
                        {<div className='details'>Start Date: {props?.startingDate?.split('T')[0]}</div>}
                        {<div className='details'>End Date: {props?.endingDate?.split('T')[0]}</div>}
                        <div className='details'>Batch: {props?.batch?.name}</div>
                    </div>
                    <div className="buttonContainer">
                    {
                        auth?.role.includes('admin')&&
                        <Link className="btn" to='/edit_record' 
                            state={{id:props.id,startingDate:props.startingDate,
                            endingDate:props.endingDate,batch:props.batch,name:props.name}}>
                                <FontAwesomeIcon icon={ faEdit} size="1x" />
                        </Link>
                    }
                    {auth?.role.includes('admin')&&<button className="btn" target="Delete student?" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashCan} size="1x" /></button>}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Record;