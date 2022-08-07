import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";
import { get } from "../services";
import DataContainer from "../DataContainer/DataContainer";
import useAuth from "../../hooks/useAuth";

const TrainerAnswerCopyList = () => {
    const { auth } = useAuth()
    const [answerCopy,setAnswerCopy]=useState([])
    const axiosPrivate=useAxiosPrivate()
    const [deleted,setIsDeleted]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController()
        get(setAnswerCopy,setIsLoading,'/api/answer_copy?trainerId='+auth?.id+'&submitted=true',controller,isMounted,axiosPrivate)
        deleted&&setIsDeleted(false)

        return()=>{
            isMounted=false
            controller.abort()
        }
    },[axiosPrivate,deleted,auth])
    return (  
        <>
            {
                isLoading?
                <Loading/>
                :<DataContainer answerCopy={answerCopy} typeUrl={'answer_copy'} setIsDeleted={setIsDeleted}/>
            }
        </>
    );
}
 
export default TrainerAnswerCopyList;