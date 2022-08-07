import './AddEditForm.css'
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";
import { get } from '../services';
import { useLocation, useNavigate } from 'react-router-dom';
const AddEditSession = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const id = location?.state?.id;
    const nameFrom = location?.state?.name;
    const course = location?.state?.course;
    const startingTimeForm=location?.state?.startingTime
    const endingTimeForm=location?.state?.endingTime
    const weekDayForm=location?.state?.weekDay
    const [courses,setCourses]=useState([])
    const axiosPrivate=useAxiosPrivate()
    const [isLoading,setIsLoading]=useState(true)
    const [name,setName]=useState('')
    const [startingTime,setStartingTime]=useState('')
    const [endingTime,setEndingTime]=useState('')
    const [weekDay,setWeekDay]=useState('')
    const [courseId,setCourseId]=useState('')
    const [added,setAdded]=useState(false)
    const [showAdded,setShowAdded]=useState(false)
    const [showError,setShowError]=useState(false)
    const [errorMsg,setErrorMsg]=useState('')
    const handleAdd= async (e)=>{
        e.preventDefault()
        const session={
            name,
            startingTime,
            endingTime,
            weekDay:weekDay===''?1:weekDay,
            course:{
                courseId:courseId!==''?courseId:courses[0].courseId
            }
        }
        console.log(session)
        setShowAdded(false)
        setShowError(false)
        setErrorMsg('')
        if(name!==''&&startingTime!==''&&endingTime!=='')
            try{
                await axiosPrivate.post('/api/session',session)
                setAdded(true)
                setShowAdded(true)
                
            }catch(e){
                if(e?.response){
                    
                    setShowError(true)
                    setErrorMsg(e?.response?.data.message)
                    console.log(e?.response?.data)
                }
            }
        
    }
    const handlePut= async (e)=>{
        e.preventDefault()
        const session={
            sessionId:id,
            name,
            startingTime,
            endingTime,
            weekDay:weekDay===''?1:weekDay,
            course:{
                courseId:courseId?courseId:courses[0].courseId
            }
        }
        console.log(session)
        setShowError(false)
        setErrorMsg('')
        if(name!==''&&startingTime!==''&&endingTime!=='')
            try{
                const response=await axiosPrivate.put('/api/session?id='+id,session)
                console.log(response.data)
                navigate('/show_session',{replace:true})
                
            }catch(e){
                if(e?.response){
                    
                    setShowError(true)
                    setErrorMsg(e?.response?.data.message)
                    console.log(e?.response?.data)
                }
            }
        
    }
    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController()
        get(setCourses,setIsLoading,'/api/course', controller, isMounted, axiosPrivate)
       return ()=>{
        isMounted=false
        controller.abort()
       }
    },[axiosPrivate])
    
    useEffect(()=>{
        if(added){
            setName('')
            setStartingTime('')
            setEndingTime('')
            setAdded(false)
        }
    },[added])
    useEffect(()=>{
        if(location.pathname==='/edit_session'){
            setName(nameFrom)
            setCourseId(course.courseId)
            setStartingTime(startingTimeForm)
            setEndingTime(endingTimeForm)
            setWeekDay(weekDayForm)
        }
    },[location,nameFrom,startingTimeForm,endingTimeForm,course,weekDayForm])
    return (
        <>
        {
            isLoading?
            <Loading/>
            :(<div className='addContainer'>
                <div className="fomContainer">
                    {showAdded?<h2 className='addedNotif'>Added!</h2>:<></>}
                    {showError?<h2 className='errorNotif'>{errorMsg}</h2>:<></>}
                    <form onSubmit={location.pathname==='/edit_session'?handlePut:handleAdd}>
                        <h6 className='addLebel' >Topic Name</h6>
                        <div className="addInputContainer">
                            <input type="text" placeholder="Topic Name" value={name} onChange={e=>setName(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >Start Date</h6>
                        <div className="addInputContainer">
                            <input type="time" value={startingTime.toString().substring(0,10)} onChange={e=>setStartingTime(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >End Date</h6>
                        <div className="addInputContainer">
                            <input type="time" value={endingTime.toString().substring(0,10)} onChange={e=>setEndingTime(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >Assigned Course</h6>
                        {/* {location.pathname==='/edit_session'?<h6 style={{marginBottom:'3vh'}} className='addLebel' >Current Course:&nbsp;{course.name}</h6>:<></>} */}
                        <div className="addInputContainer">
                            <select value={courseId} onChange={e=>setCourseId(e.target.value)}>
                                {
                                    courses?.map(course=>(
                                        <option key={course.courseId} value={course.courseId}>{course.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <h6 className='addLebel' >Week day</h6>
                        <div className="addInputContainer">
                            <select value={weekDay}  onChange={e=>setWeekDay(e.target.value)}>
                                <option value={1}>Monday</option>
                                <option value={2}>Tuesday</option>
                                <option value={3}>Wednesday</option>
                                <option value={4}>Thursday</option>
                                <option value={5}>Friday</option>
                            </select>
                        </div>
                        {location.pathname==='/edit_session'?
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

export default AddEditSession;