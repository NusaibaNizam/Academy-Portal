import React from 'react';
import "./Data.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link} from "react-router-dom";
import { faEdit, faTrashCan, faPeopleGroup} from '@fortawesome/free-solid-svg-icons'
import {useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const Batch = (props) => {
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
                    <FontAwesomeIcon icon={faPeopleGroup} size='3x'  className='cardTopIcon'/>
                </div>
                <div className="userContainer">
                    <div className="detailsContainer">

                        <h1>{props?.name}</h1>
                        <div className='details'>Courses:&nbsp;
                            {props?.courses?.length!==0? props?.courses?.map(
                                c=><span key={c?.courseId}>{c?.name},&nbsp;</span>
                            ):<span>Not Selected</span>}
                        </div>
                    </div>
                    <div className="buttonContainer">
                    {
                        auth?.role.includes('admin')
                        ?<Link className="btn" to='/edit_batch' 
                            state={{id:props.id,courses:props.courses,name:props.name}}><FontAwesomeIcon icon={ faEdit} size="1x" />
                        </Link>
                        :<></>
                    }
                    {
                        auth?.role.includes('admin')
                        ?<button className="btn" target="Delete student?" onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrashCan} size="1x" />
                        </button>
                        :<></>
                    }
                    </div>
                </div>

            </div>
        </>
    );
}

export default Batch;