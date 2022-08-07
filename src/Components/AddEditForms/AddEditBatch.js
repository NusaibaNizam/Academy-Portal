import './AddEditForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading/Loading";
import { get } from '../services';
import { useLocation, useNavigate } from 'react-router-dom';
const AddEditBatch = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const id = location?.state?.id;
    const nameFrom = location?.state?.name;
    const coursesForm = location?.state?.courses;
    const [courses,setCourses]=useState([])
    const axiosPrivate=useAxiosPrivate()
    const [isLoading,setIsLoading]=useState(true)
    const [name,setName]=useState('')
    const [curentCourse,setCurentCourse]=useState('')
    const [selectedCourses,setSelectedCourse]=useState([])
    const [selectedCourseNames,setSelectedCourseNames]=useState([])
    const [added,setAdded]=useState(false)
    const [showAdded,setShowAdded]=useState(false)


    const handleAdd= async (e)=>{
        e.preventDefault()
        const batch={
            name,
            courses:selectedCourses
        }
        setShowAdded(false)
        console.log(batch)
        if(name!=='' && selectedCourses.length)
            try{
                await axiosPrivate.post('/api/batch',batch)
                setAdded(true)
                setShowAdded(true)
            }catch(e){
                if(e?.response)
                    console.log(e?.response?.data)
            }
        
    }

    const handlePut=async (e)=>{
        e.preventDefault()
        const batch={
            name,
            courses:selectedCourses
        }
        setShowAdded(false)
        console.log(batch)
        if(name!=='' && selectedCourses.length)
            try{
                await axiosPrivate.put('/api/batch?id='+id,batch)
                navigate('/show_batch',{replace:true})
            }catch(e){
                if(e?.response)
                    console.log(e?.response?.data)
            }
    }

    const handleSelect =(e)=>{
        e.preventDefault()
        const selected=courses.filter(c=>parseInt(c.courseId)===parseInt(curentCourse))
        if(!selectedCourseNames.includes(selected[0].name)){
            setSelectedCourse(prev => [...prev, {courseId:curentCourse}])
            setSelectedCourseNames(prev => [...prev,selected[0].name])
        }
        
    }

    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController()
        get(setCourses,setIsLoading,'/api/course',controller,isMounted,axiosPrivate)
        return ()=>{
            isMounted=false
            controller.abort()
        }
    },[axiosPrivate])

    useEffect(()=>{
        if(added){    
            setSelectedCourseNames([])
            setSelectedCourse([])
            setName('')
            setAdded(false)
        }
    },[added])

    useEffect(()=>{
        if(location.pathname==='/edit_batch'){
            setName(nameFrom)
        }
    },[location,nameFrom])
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
                    {showAdded?<h2  className='addedNotif'>Added!</h2>:<></>}
                    <form  onSubmit={location.pathname==='/edit_batch'?handlePut:handleAdd}>
                        <h6 className='addLebel' >Batch Name</h6>
                        <div className="addInputContainer">
                            <input type="text" placeholder="Batch Name" value={name} onChange={e=>setName(e.target.value)} required/>
                        </div>
                        <h6 className='addLebel' >Add Course</h6>
                        {coursesForm?.length?
                        <h6 style={{marginBottom:'3vh'}} className='addLebel' >Current Courses :&nbsp;&nbsp; 
                            {
                                coursesForm.map((c)=>{
                                    return (<span style={{color:'black'}} key={c.courseId}>{c.name}&nbsp;&nbsp;&nbsp;</span>)
                                })
                            }</h6>
                            :location.pathname==='/edit_batch'?
                            <h6 style={{marginBottom:'3vh'}} className='addLebel' >Current Courses :None&nbsp;&nbsp;</h6>
                            :<></>
                        }
                        <div className="addInputContainer">
                            <select defaultValue={'default'} onChange={e=>setCurentCourse(e.target.value)}>
                                
                                    <option value={'default'} disabled>--Select Course--</option>
                                {
                                    courses?.map(course=>(
                                        <option key={course.courseId} value={course.courseId}>{course.name}</option>
                                    ))
                                }
                            </select>
                            <button className='btn whiteBtn' onClick={handleSelect}>Add</button>
                        </div>
                        {selectedCourseNames.length?<h6 style={{marginBottom:'3vh'}} className='addLebel' >Selected Courses :&nbsp;&nbsp; 
                            {
                                selectedCourseNames.map((name,i)=>{
                                    return (<span style={{color:'black'}} key={i}>{name}&nbsp;&nbsp;&nbsp;</span>)
                                })
                            }</h6>:<></>
                        }
                        {location.pathname==='/edit_batch'?
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

export default AddEditBatch;