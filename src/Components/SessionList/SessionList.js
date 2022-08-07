import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";
import { get } from "../services";
import DataContainer from "../DataContainer/DataContainer";

const SessionList = () => {
    const [session,setSession]=useState([])
    const axiosPrivate=useAxiosPrivate()
    const [deleted,setIsDeleted]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController()
        get(setSession,setIsLoading,'/api/session',controller,isMounted,axiosPrivate)
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
                :<DataContainer session={session} typeUrl={'session'} setIsDeleted={setIsDeleted}/>
            }
        </>
    );
}
 
export default SessionList;