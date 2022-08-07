import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";
import { get } from "../services";
import DataContainer from "../DataContainer/DataContainer";
import SearchBar from "../SearchBar/Searchbar";
import ErrorElement from "../ErrorElement/ErrorElement";

const CurrentStudentsList = () => {
    const [users,setUsers]=useState([])
    const axiosPrivate=useAxiosPrivate()
    const [deleted,setIsDeleted]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [name,setName]=useState('')
    const [errMsg,setErrMSG]=useState()
    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController()
        get(setUsers,setIsLoading,'/api/trainees?accepted=true'+name,controller,isMounted,axiosPrivate,setErrMSG)
        deleted&&setIsDeleted(false)

        return()=>{
            isMounted=false
            controller.abort()
        }
    },[axiosPrivate,deleted,name])
    return (  
        <>
            {
                isLoading?
                <Loading/>
                :<>
                    <SearchBar setUrl={setName}/>
                    {errMsg?<ErrorElement msg={errMsg}/>
                    :<DataContainer users={users} typeUrl={'trainees'} currrent={true} setIsDeleted={setIsDeleted}/>}
                </>
            }
        </>
    );
}
 
export default CurrentStudentsList;