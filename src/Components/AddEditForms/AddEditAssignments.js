import './AddEditForm.css'
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";
import { get } from '../services';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const AddEditAssignments = () => {
    const{auth}=useAuth()
    const location=useLocation()
    const navigate=useNavigate()
    const id = location?.state?.id;
    const nameFrom = location?.state?.name;
    const batch = location?.state?.batch;
    const deadLineForm=location?.state?.deadLine
    const descriptionForm=location?.state?.description
    const markForm=location?.state?.mark
    const [batches,setBatches]=useState([])
    const axiosPrivate=useAxiosPrivate()
    const [isLoading,setIsLoading]=useState(true)
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const [mark,setMark]=useState('')
    const [deadLine,setDeadLine]=useState('')
    const [batchId,setBatchId]=useState()
    const [added,setAdded]=useState(false)
    const [showAdded,setShowAdded]=useState(false)
    const [showError,setShowError]=useState(false)
    const [errorMsg,setErrorMsg]=useState('')
    const handleAdd= async (e)=>{
        e.preventDefault()
        const assignment={
            name,
            deadLine,
            description,
            mark,
            trainer:{
                uid:auth?.id
            },
            batch:{
                batchId:batchId?batchId:batches[0].batchId
            }
        }
        console.log(assignment)
        setShowAdded(false)
        setShowError(false)
        setErrorMsg('')
        if(name!==''&&deadLine!==''&&description!==''&&mark!=='')
            try{
                await axiosPrivate.post('/api/assignment',assignment)
                setAdded(true)
                setShowAdded(true)
                
            }catch(e){
                if(e?.response)
                    console.log(e?.response?.data)
                    setShowError(true)
                    setErrorMsg(e?.response?.data.message)
            }
        
    }
    const handlePut= async (e)=>{
        e.preventDefault()
        const assignment={
            name,
            deadLine,
            description,
            mark,
            trainer:{
                uid:auth?.id
            },
            batch:{
                batchId:batchId?batchId:batches[0].batchId
            }
        }
        console.log(assignment)
        setShowError(false)
        setErrorMsg('')
        if(name!==''&&deadLine!==''&&description!==''&&mark!=='')
            try{
                const response=await axiosPrivate.put('/api/assignment?id='+id,assignment)
                console.log(response.data)
                navigate('/trainer_assignments',{replace:true})
                
            }catch(e){
                if(e?.response)
                    console.log(e?.response?.data)
                    setShowError(true)
                    setErrorMsg(e?.response?.data.message)
            }
        
    }
    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController()
        get(setBatches,setIsLoading,'/api/batch?trainerId='+auth?.id, controller, isMounted, axiosPrivate)
       return ()=>{
        isMounted=false
        controller.abort()
       }
    },[axiosPrivate,auth])
    
    useEffect(()=>{
        if(added){
            setName('')
            setDeadLine('')
            setDescription('')
            setMark('')
            setAdded(false)
        }
    },[added])
    useEffect(()=>{
        if(location.pathname==='/edit_assignment'){
            setName(nameFrom)
            setBatchId(batch.batchId)
            setDeadLine(deadLineForm)
            setDescription(descriptionForm)
            setMark(markForm)
        }
    },[location,nameFrom,deadLineForm,descriptionForm,markForm,batch])
    return (
        <>
        {
            isLoading?
            <Loading/>
            :(<div className='addContainer'>
                <div className="fomContainer">

                    {showAdded?<h2 className='addedNotif'>Added!</h2>:<></>}
                    {showError?<h2 className='errorNotif'>{errorMsg}</h2>:<></>}
                    <form  onSubmit={location.pathname==='/edit_assignment'?handlePut:handleAdd}>
                        <h6 className='addLebel' >Assignment Topic</h6>
                        <div className="addInputContainer">
                            <input type="text" placeholder="Assignment Topic" value={name} onChange={e=>setName(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >Description</h6>
                        <div className="addInputContainer">
                            <textarea type="text" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >Mark</h6>
                        <div className="addInputContainer">
                            <input type="number" placeholder="Mark" value={mark} onChange={e=>setMark(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >Deadline</h6>
                        <div className="addInputContainer">
                            <input type="date" value={deadLine.toString().substring(0,10)} onChange={e=>setDeadLine(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >Assigned Batch</h6>
                        {location.pathname==='/edit_assignment'?<h6 style={{marginBottom:'3vh'}} className='addLebel' >Current Batch:&nbsp;{batch.name}</h6>:<></>}
                        <div className="addInputContainer">
                            <select onChange={e=>setBatchId(e.target.value)}>
                                {
                                    batches?.map(batch=>(
                                        <option key={batch.batchId} value={batch.batchId}>{batch.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {location.pathname==='/edit_assignment'?
                            <input type="submit" value="Edit" />
                            :
                            <input type="submit" value="Add" />
                        }


                    </form>
                </div>
            </div>)
        }
        </>
        
    );
}

export default AddEditAssignments;