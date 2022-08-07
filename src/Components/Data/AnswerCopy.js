import React from 'react';
import "./Data.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { faFileCircleCheck, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth';

const AnswerCopy = (props) => {
    const { auth } = useAuth()
    
    return (
        <>
            <div className="userCard">
                <div className="imgContainer">
                    <FontAwesomeIcon icon={faFileCircleCheck} size='3x' className='cardTopIcon' />
                </div>
                <div className="userContainer">
                    <div className="detailsContainer">

                        <h1>Topic:&nbsp;{props?.answerCopy?.assignment?.name}</h1>
                        <div className='details'>Description:&nbsp;{props?.answerCopy?.assignment?.description}</div>
                        {auth?.role.includes('student')&&<div className='details'>
                            Trainer:&nbsp;{props?.answerCopy?.assignment?.trainer?.name}</div>}
                        {auth?.role.includes('trainer')&&<div className='details'>
                        Trainee:&nbsp;{props?.answerCopy?.student?.name}</div>}
                        <div className='details'>Mark:&nbsp;
                        {props?.answerCopy?.grantedMark ? props.answerCopy.grantedMark+" out of "+props.answerCopy.assignment.mark:'Not marked yet'}</div>
                        <div className='details'>Answer:&nbsp;{props?.answerCopy?.answer}</div>
                    </div>
                    <div className="buttonContainer">
                        {
                            auth?.role.includes('trainer')&&
                            <Link className="btn" to='/mark_assignment' style={{maxHeight:'5vh'}}
                                state={{answerCopy:props?.answerCopy}}>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" />
                            </Link>
                        }
                    </div>
                </div>

            </div>
        </>
    );
}

export default AnswerCopy;