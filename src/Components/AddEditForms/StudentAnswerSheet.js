import './AddEditForm.css'
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
const StudentAnswerSheet = () => {
    const location=useLocation()
    const answerCopy=location?.state?.answerCopy
    const id = answerCopy?.answerCopyId;
    const nameFrom = answerCopy?.assignment?.name;
    const descriptionForm=answerCopy?.assignment?.description
    const axiosPrivate=useAxiosPrivate()
    const [answer,setAnswer]=useState(answerCopy?.answer?answerCopy.answer:'')
    const [added,setAdded]=useState(false)
    const [showAdded,setShowAdded]=useState(false)
    const handlePut= async (e)=>{
        e.preventDefault()
        const answerCopy={
            answer,
            submmited:true
        }
        console.log(answerCopy)
        setShowAdded(false)
        if(answer!=='')
            try{
                const response=await axiosPrivate.put('/api/answer_copy?id='+id,answerCopy)
                console.log(response.data)
                setAdded(true)
                setShowAdded(true)
                
            }catch(e){
                if(e?.response)
                    console.log(e?.response?.data)
            }
        
    }
    useEffect(()=>{
        if(added){
            setAnswer('')
            setAdded(false)
        }
    },[added])
    return (
        <>
        {
            (<div className='addContainer'>
                <div className="fomContainer">
                <div className="iconContainer">
                        <FontAwesomeIcon icon={faGraduationCap} size="5x" className='icon'/>
                    </div>
                    {showAdded?<h2 className='addedNotif'>Send!</h2>:<></>}
                    <form onSubmit={handlePut}>
                        <h6 className='addLebel' >Assignment Topic</h6>
                        <div className="addInputContainer">
                            <input type="text" value={nameFrom}  readOnly/>
                        </div>
                        <h6 className='addLebel' >Question</h6>
                        <div className="addInputContainer">
                            <input type="text" value={descriptionForm} readOnly/>
                        </div>
                        <h6 className='addLebel' >Answer</h6>
                        <div className="addInputContainer">
                            <textarea type="text" value={answer}  onChange={e=>setAnswer(e.target.value)} required/>
                        </div>
                        <input type="submit" value="Send" />


                    </form>
                </div>
            </div>)
        }
        </>
        
    );
}

export default StudentAnswerSheet;