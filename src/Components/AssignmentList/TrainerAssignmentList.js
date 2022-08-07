import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";
import { get } from "../services";
import DataContainer from "../DataContainer/DataContainer";
import useAuth from "../../hooks/useAuth";

const TrainerAssignmentList = () => {
    const { auth } = useAuth()
    const [assignment,setAssignments]=useState([])
    const axiosPrivate=useAxiosPrivate()
    const [deleted,setIsDeleted]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController()
        get(setAssignments,setIsLoading,'/api/assignment?trainerId='+auth?.id,controller,isMounted,axiosPrivate)
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
                :<DataContainer assignment={assignment} typeUrl={'assignment'} setIsDeleted={setIsDeleted}/>
            }
        </>
    );
}
 
export default TrainerAssignmentList;