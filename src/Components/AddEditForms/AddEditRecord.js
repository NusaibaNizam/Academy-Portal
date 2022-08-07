import './AddEditForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";
import { get } from '../services';
import { useLocation, useNavigate } from 'react-router-dom';
const AddEditRecord = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const id = location?.state?.id;
    const nameFrom = location?.state?.name;
    const batch = location?.state?.batch;
    const startingDateForm=location?.state?.startingDate
    const endingDateForm=location?.state?.endingDate
    const [batches,setBatches]=useState([])
    const axiosPrivate=useAxiosPrivate()
    const [isLoading,setIsLoading]=useState(true)
    const [name,setName]=useState('')
    const [startingDate,setStartingDate]=useState('')
    const [endingDate,setEndingDate]=useState('')
    const [batchId,setBatchId]=useState()
    const [added,setAdded]=useState(false)
    const [showAdded,setShowAdded]=useState(false)
    const handleAdd= async (e)=>{
        e.preventDefault()
        const record={
            name,
            startingDate,
            endingDate,
            batch:{
                batchId:batchId?batchId:batches[0].batchId
            }
        }
        console.log(record)
        setShowAdded(false)
        if(name!==''&&startingDate!==''&&endingDate!=='')
            try{
                await axiosPrivate.post('/api/record',record)
                setAdded(true)
                setShowAdded(true)
                
            }catch(e){
                if(e?.response)
                    console.log(e?.response?.data)
            }
        
    }
    const handlePut= async (e)=>{
        e.preventDefault()
        const record={
            name,
            startingDate,
            endingDate,
            batch:{
                batchId:batchId?batchId:batches[0].batchId
            }
        }
        console.log(record)
        if(name!==''&&startingDate!==''&&endingDate!=='')
            try{
                const response=await axiosPrivate.put('/api/record?id='+id,record)
                console.log(response.data)
                navigate('/show_record',{replace:true})
                
            }catch(e){
                if(e?.response)
                    console.log(e?.response?.data)
            }
        
    }
    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController()
        get(setBatches,setIsLoading,'/api/batch', controller, isMounted, axiosPrivate)
       return ()=>{
        isMounted=false
        controller.abort()
       }
    },[axiosPrivate])
    
    useEffect(()=>{
        if(added){
            setName('')
            setStartingDate('')
            setEndingDate('')
            setAdded(false)
        }
    },[added])
    useEffect(()=>{
        if(location.pathname==='/edit_record'){
            setName(nameFrom)
            setBatchId(batch.batchId)
            setStartingDate(startingDateForm)
            setEndingDate(endingDateForm)
        }
    },[location,nameFrom,startingDateForm,endingDateForm,batch])
    return (
        <>
        {
            isLoading?
            <Loading/>
            :(<div className='addContainer'>
                <div className="fomContainer">

                    <div className="iconContainer">
                        <FontAwesomeIcon icon={faGraduationCap} size="5x" className='icon'/>
                    </div>
                    {showAdded?<h2 className='addedNotif'>Added!</h2>:<></>}
                    <form onSubmit={location.pathname==='/edit_record'?handlePut:handleAdd}>
                        <h6 className='addLebel' >Training Name</h6>
                        <div className="addInputContainer">
                            <input type="text" placeholder="Training Name" value={name} onChange={e=>setName(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >Start Date</h6>
                        <div className="addInputContainer">
                            <input type="date" value={startingDate.toString().substring(0,10)} onChange={e=>setStartingDate(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >End Date</h6>
                        <div className="addInputContainer">
                            <input type="date" value={endingDate.toString().substring(0,10)} onChange={e=>setEndingDate(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >Assigned Batch</h6>
                        {location.pathname==='/edit_record'?<h6 style={{marginBottom:'3vh'}} className='addLebel' >Current Batch:&nbsp;{batch.name}</h6>:<></>}
                        <div className="addInputContainer">
                            <select onChange={e=>setBatchId(e.target.value)}>
                                {
                                    batches?.map(batch=>(
                                        <option key={batch.batchId} value={batch.batchId}>{batch.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {location.pathname==='/edit_record'?
                            <input type="submit" value="Edit"/>
                            :
                            <input type="submit" value="Add"/>
                        }


                    </form>
                </div>
            </div>)
        }
        </>
        
    );
}

export default AddEditRecord;