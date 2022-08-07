import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";
import { get } from "../services";
import DataContainer from "../DataContainer/DataContainer";
import useAuth from "../../hooks/useAuth";

const TrainerCourseList = () => {
    const {auth}=useAuth()
    const [course,setCourse]=useState([])
    const axiosPrivate=useAxiosPrivate()
    const [deleted,setIsDeleted]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController()
        get(setCourse,setIsLoading,'/api/course?trainerId='+auth?.id,controller,isMounted,axiosPrivate)
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
                :<DataContainer course={course} typeUrl={'course'} setIsDeleted={setIsDeleted}/>
            }
        </>
    );
}
 
export default TrainerCourseList;