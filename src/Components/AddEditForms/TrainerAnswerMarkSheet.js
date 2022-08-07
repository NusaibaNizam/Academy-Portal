import './AddEditForm.css'
import {useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
const MarkAnswerSheet = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const answerCopy=location?.state?.answerCopy
    const id = answerCopy?.answerCopyId;
    const nameFrom = answerCopy?.assignment?.name;
    const descriptionForm=answerCopy?.assignment?.description
    const answer=answerCopy?.answer
    const [grantedMark,setMark]=useState(answerCopy?.grantedMark?answerCopy.grantedMark:'')
    const axiosPrivate=useAxiosPrivate()
    const handlePut= async (e)=>{
        e.preventDefault()
        const answerCopy={
            grantedMark,
            submmited:true
        }
        console.log(answerCopy)
        if(grantedMark!=='')
            try{
                const response=await axiosPrivate.put('/api/answer_copy?id='+id,answerCopy)
                console.log(response.data)
                navigate('/submissions')
            }catch(e){
                if(e?.response)
                    console.log(e?.response?.data)
            }
        
    }
    return (
        <>
        {
            (<div className='addContainer'>
                <div className="fomContainer">
                <div className="iconContainer">
                        <FontAwesomeIcon icon={faGraduationCap} size="5x" className='icon'/>
                    </div>
                    <form  onSubmit={handlePut}>
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
                            <textarea type="text" value={answer} readOnly/>
                        </div>
                        <h6 className='addLebel' >Mark out of&nbsp;{answerCopy.assignment.mark}</h6>
                        <div className="addInputContainer">
                            <input type="number" placeholder='mark' max={answerCopy?.assignment?.mark} min={0} value={grantedMark} onChange={(e)=>setMark(e.target.value)} required/>
                        </div>
                        <input type="submit" value="Set Mark"/>


                    </form>
                </div>
            </div>)
        }
        </>
        
    );
}

export default MarkAnswerSheet;