import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";
import { get } from "../services";
import DataContainer from "../DataContainer/DataContainer";

const PendingTrainers = () => {
    const [users,setUsers]=useState([])
    const axiosPrivate=useAxiosPrivate()
    const [deleted,setIsDeleted]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController()
        get(setUsers,setIsLoading,'/api/trainers?accepted=false',controller,isMounted,axiosPrivate)
        deleted&&setIsDeleted(false)

        return()=>{
            isMounted=false
            controller.abort()
        }
    },[axiosPrivate,deleted])
    return (  
        <>
            {
                isLoading?
                <Loading/>
                :<DataContainer users={users} typeUrl={'trainers'} setIsDeleted={setIsDeleted}/>
            }
        </>
    );
}
 
export default PendingTrainers;