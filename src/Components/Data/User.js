import React from 'react';
import "./Data.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from "react-router-dom";
import { faEdit, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const User = (props) => {
    const {auth}=useAuth()
    const axiosPrivate=useAxiosPrivate()
    const location=useLocation()
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
                    <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="profile" />
                </div>
                <div className="userContainer">
                    <div className="detailsContainer">

                        <h1>{props?.name}</h1>
                        <div className='details'>ID: {props?.id}</div>
                        <div className='details'>Email: {props?.email}</div>
                        {<div className='details'>Roles: {props?.roles?.map(datas=>(
                            " "+datas?.name?.toUpperCase()
                        ))}</div>}
                    </div>
                    <div className="buttonContainer">
                    {auth?.id!==props?.id&&<Link className="btn" to={props.typeUrl==='trainees'?'/trainee_profile':'/trainer_profile'} 
                    state={{id:props.id ,from:location}}>
                        <FontAwesomeIcon icon={ faEdit} size="1x" /></Link>}
                    {auth?.id!==props?.id&&<button className="btn" target="Delete student?" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashCan} size="1x" /></button>}
                    </div>
                </div>

            </div>
        </>
    );
}

export default User;