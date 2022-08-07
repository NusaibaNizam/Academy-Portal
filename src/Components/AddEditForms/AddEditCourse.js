import './AddEditForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";
import { get } from '../services';
import { useLocation, useNavigate } from 'react-router-dom';
const AddEditCourse = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const id = location?.state?.id;
    const creditFrom = location?.state?.credit;
    const nameFrom = location?.state?.name;
    const trainer = location?.state?.trainer;
    const [trainers,setTrainers]=useState([])
    const axiosPrivate=useAxiosPrivate()
    const [isLoading,setIsLoading]=useState(true)
    const [name,setName]=useState('')
    const [credit,setCredit]=useState('')
    const [trainerId,setTrainerId]=useState()
    const [added,setAdded]=useState(false)
    const [showAdded,setShowAdded]=useState(false)
    const handleAdd= async (e)=>{
        e.preventDefault()
        const course={
            name,
            credit,
            trainer:{
                uid:trainerId?trainerId:trainers[0].uid
            }
        }
        console.log(course)
        setShowAdded(false)
        if(name!==''&&credit!=='')
            try{
                await axiosPrivate.post('/api/course',course)
                setAdded(true)
                setShowAdded(true)
                
            }catch(e){
                if(e?.response)
                    console.log(e?.response?.data)
            }
        
    }
    const handlePut= async (e)=>{
        e.preventDefault()
        const course={
            name,
            credit,
            trainer:{
                uid:trainerId?trainerId:trainers[0].uid
            }
        }
        console.log(course)
        if(name!==''&&credit!=='')
            try{
                const response=await axiosPrivate.put('/api/course?id='+id,course)
                console.log(response.data)
                navigate('/show_course',{replace:true})
                
            }catch(e){
                if(e?.response)
                    console.log(e?.response?.data)
            }
        
    }
    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController()
        get(setTrainers,setIsLoading,'/api/trainers?accepted=true', controller, isMounted, axiosPrivate)
       return ()=>{
        isMounted=false
        controller.abort()
       }
    },[axiosPrivate])
    
    useEffect(()=>{
        if(added){    
            setCredit('')
            setName('')
            setAdded(false)
        }
    },[added])
    useEffect(()=>{
        if(location.pathname==='/edit_course'){    
            setCredit(creditFrom)
            setName(nameFrom)
            setTrainerId(trainer.uid)
        }
    },[location,creditFrom,nameFrom,trainer])
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
                    <form onSubmit={location.pathname==='/edit_course'?handlePut:handleAdd}>
                        <h6 className='addLebel' >Course Name</h6>
                        <div className="addInputContainer">
                            <input type="text" placeholder="Course Name" value={name} onChange={e=>setName(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >Course Credit</h6>
                        <div className="addInputContainer">
                            <input type="number" placeholder="Course Credit" value={credit} onChange={e=>setCredit(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >Course Trainer</h6>
                        {location.pathname==='/edit_course'?<h6 style={{marginBottom:'3vh'}} className='addLebel' >Current Trainer:&nbsp;{trainer.name}</h6>:<></>}
                        <div className="addInputContainer">
                            <select onChange={e=>setTrainerId(e.target.value)}>
                                {
                                    trainers?.map(trainer=>(
                                        <option key={trainer.uid} value={trainer.uid}>{trainer.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {location.pathname==='/edit_course'?
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

export default AddEditCourse;