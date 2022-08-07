import React from 'react';
import "./Data.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { faEdit, faTrashCan, faFileLines , faReply} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const Assignment = (props) => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const handleDelete = () => {
        axiosPrivate.delete("http://localhost:8080/api/" + props.typeUrl + "/?id=" + props.id)
            .then(response => {
                props.setIsDeleted(true)
            }).catch(e => {
                console.log(e)
                navigate("/error")
            })
    }
    return (
        <>
            <div className="userCard">
                <div className="imgContainer">
                    <FontAwesomeIcon icon={faFileLines} size='3x'  className='cardTopIcon' />
                </div>
                <div className="userContainer">
                    <div className="detailsContainer">

                        <h1>Topic:&nbsp;{props?.name}</h1>
                        <div className='details'>Description:&nbsp;{props?.description}</div>
                        <div className='details'>Deadline:&nbsp;{props?.deadLine}</div>
                        <div className='details'>Mark:&nbsp;{props?.mark}</div>
                        {auth?.role.includes('student')&&<div className='details'>
                            Trainer:&nbsp;{props?.answerCopy?.assignment?.trainer?.name}</div>}
                        <div className='details'>Batch:&nbsp;{props?.batch?.name}</div>
                        
                    </div>
                    <div className="buttonContainer">
                        {
                            auth?.role.includes('trainer')&&
                            <Link className="btn" to='/edit_assignment'
                                state={{ id: props.id, batch: props.batch, name: props.name, description: props.description, 
                                deadLine:props.deadLine, mark: props.mark}}>
                                    <FontAwesomeIcon icon={faEdit} size="1x" />
                            </Link>
                        }
                        {
                            auth?.role.includes('trainer')&&
                            <button className="btn" target="Delete student?" onClick={handleDelete}>
                                <FontAwesomeIcon icon={faTrashCan} size="1x" />
                            </button>
                        }
                        {
                            props.answerCopy&&
                            <Link className="btn" to='/answer_assignment' style={{maxHeight:'5vh'}}
                                state={{answerCopy:props.answerCopy}}>
                                    <FontAwesomeIcon icon={faReply} size="2x" />
                            </Link>
                        }
                    </div>
                </div>

            </div>
        </>
    );
}

export default Assignment;