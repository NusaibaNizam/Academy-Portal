import './UserProfile.css'
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from '../Loading/Loading';
import CourseCard from '../CourseCard/CourseCard';
import { get, handleLogout } from '../services';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const url='/api/trainees?id='

const TraineeEditProfile = () => {

    const {auth}=useAuth()
    const navigate = useNavigate()
    const [trainee, setTrainee] = useState([])
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const axiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        get(setTrainee, setIsLoading, url + auth?.id, controller, isMounted, axiosPrivate)
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [axiosPrivate, auth])

    const handleUpdate = async (e) => {
        e.preventDefault()
        const traineeReq = {
            pass: trainee.pass,
            name,
            email
        }
        console.log(traineeReq)
        try {
            const response = await axiosPrivate.put(url + auth?.id, traineeReq)
            console.log(response.data)
            handleLogout(navigate)
        } catch (e) {
            if (e?.response)
                console.log(e?.response?.data)
        }
    }
    useEffect(()=>{
        setName(trainee.name)
        setEmail(trainee.email)
    },[trainee])
    return (
        <>
            {
                isLoading ? <Loading />
                    : (
                        <div className="profileContainer">

                            <div className="boxProfile">
                                <div className="mainProfile">

                                    <div className="imgContainerProfile">
                                        <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="profile" />
                                    </div>
                                    <form onSubmit={handleUpdate}>
                                        <h6 style={{ marginBottom: '3vh' }} className='addLebel' >Trainee Batch :{trainee?.batch?.name?trainee?.batch?.name:'Not set yet'}</h6>
                                        <h2 className="bio" style={{marginTop:'1vh'}}>Name: {trainee.name} </h2>
                                        <input type="text" placeholder='Edit name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                                        <h2 className="bio"  style={{marginTop:'1vh'}}>Email: {trainee.email}</h2>
                                        <input type="text" placeholder='Edit email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>

                                        <button type='submit' className="btnProfile" >
                                            Update and Login
                                        </button>
                                    </form>
                                </div>

                                <div className='coursesProfile'>
                                            <h1 className='profileCourseHeadeing'>Courses</h1>
                                            <div className='profileCourseContainer'>
                                                {/* {console.log(trainee?.courses)} */}
                                                {
                                                    (
                                                        !trainee?.batch?.courses?.length ?
                                                            <h3 className='profileCourseHeadeing noUnderline'>No Courses Added Yet!</h3>

                                                            : (
                                                                trainee?.batch?.courses.map((course) => (
                                                                    <CourseCard key={course.courseId} course={course} />
                                                                ))
                                                            )
                                                    )
                                                }
                                            </div>
                                        </div>
                            </div>

                        </div>
                    )
            }

        </>
    );
}

export default TraineeEditProfile;