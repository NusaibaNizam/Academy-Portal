import './UserProfile.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from '../Loading/Loading';
import CourseCard from '../CourseCard/CourseCard';
import { get } from '../services';

const UserProfile = () => {


    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const id = location.state.id;
    const url = location.pathname === '/trainee_profile' ? '/api/trainees?id=' : '/api/trainers?id='
    const width=(location.pathname === '/trainee_profile')?'90vw':'25vw'
    const [user, setUser] = useState([])
    const axiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState(true)
    const [isBatchLoading, setBatchIsLoading] = useState(true)
    const [batches, setbatches] = useState([])
    const [batchId, setBatchId] = useState()
    const [added, setAdded] = useState(false)

    //load user
    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        get(setUser, setIsLoading, url + id, controller, isMounted, axiosPrivate)
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [axiosPrivate, id, added, url])

    //load batch
    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        get(setbatches, setBatchIsLoading, '/api/batch', controller, isMounted, axiosPrivate)
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [axiosPrivate])

    //add batch
    const handleAdd = async (e) => {
        e.preventDefault()
        const batch = {
            batchId
        }
        const trainee = {
            pass: user.pass,
            batch
        }
        setAdded(false)
        console.log(trainee)
        if (batchId)
            try {
                const response = await axiosPrivate.put(url + id, trainee)
                setAdded(true)
                console.log(response.data)
            } catch (e) {
                if (e?.response)
                    console.log(e?.response?.data)
            }
    }
    //toggle admin
    const handleMakeAdmin = async (e,makeAdmin) => {
        e.preventDefault()
        const trainer = {
            pass: user.pass,
            roles: makeAdmin?[{"roleId": 2},{"roleId": 3}]:[{"roleId": 2}]
        }
        setAdded(false)
        console.log(trainer)
        try {
            const response = await axiosPrivate.put(url + id, trainer)
            setAdded(true)
            console.log(response.data)
        } catch (e) {
            if (e?.response)
                console.log(e?.response?.data)
        }
            
    }
    //accept request
    const handleAccept = async (e) => {
        e.preventDefault()
        const userReq = {
            pass: user.pass,
            accepted: true
        }
        console.log(user)
        try {
            const response = await axiosPrivate.put(url + id, userReq)
            console.log(response.data)
            navigate(from, { replace: true })
        } catch (e) {
            if (e?.response)
                console.log(e?.response?.data)
        }
    }
    return (
        <>
            {
                (isLoading && isBatchLoading) ? <Loading />
                    : (
                        <div className="profileContainer">

                            <div className="boxProfile" style={{width:width}}>
                                <div className="mainProfile">

                                    <div className="imgContainerProfile">
                                        <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="profile" />
                                    </div>

                                    <p>{user?.name}</p>
                                    <p className="bio">{user?.email}</p>

                                    {/**************** role assign ***********/}
                                    {location.pathname !== '/trainee_profile'&&
                                        <>
                                            <p className="bio">Roles:&nbsp;{user?.roles?.map(role=>(
                                                <span key={role.roleId}>{role.name.toUpperCase()}&nbsp;</span>
                                            ))}</p>
                                            {
                                                !user?.roles?.map(role=>role.name).includes('admin')?
                                                <button className="btnProfile" onClick={e=>handleMakeAdmin(e,true)}>
                                                    Make Admin
                                                </button>
                                                :<button className="btnProfile" onClick={e=>handleMakeAdmin(e,false)}>
                                                    Remove Admin
                                                </button>
                                            }
                                        </>
                                        
                                    }
                                    {/**************** batch selection ***********/}
                                    {
                                        location.pathname === '/trainee_profile' ?
                                            (<>{<h6 style={{ marginBottom: '3vh' }} className='addLebel' >Trainee Batch :{user?.batch?.name?user?.batch?.name:'Not set yet'}</h6>}
                                                <div className='profileBactchContainer'>
                                                    <select defaultValue={'default'} onChange={e => setBatchId(e.target.value)}>
                                                        <option value={'default'} disabled>--Select Batch--</option>
                                                        {
                                                            batches?.map(batch => (
                                                                <option key={batch.batchId} value={batch.batchId}>{batch.name}</option>
                                                            ))
                                                        }
                                                    </select>

                                                    <button className="btn" style={{ fontWeight: 'bold' }} onClick={handleAdd}>
                                                        Set Batch
                                                    </button>
                                                </div></>)
                                            : <></>
                                    }
                                   {
                                    !user?.accepted&&
                                    <button className="btnProfile" onClick={handleAccept}>
                                        Accept
                                    </button>
                                   } 
                                </div>

                                {/**************** batch show ***********/}
                                {
                                    location.pathname === '/trainee_profile' ?
                                        <div className='coursesProfile'>
                                            <h1 className='profileCourseHeadeing'>Courses</h1>
                                            <div className='profileCourseContainer'>
                                                {/* {console.log(user?.courses)} */}
                                                {
                                                    (
                                                        !user?.batch?.courses?.length ?
                                                            <h3 className='profileCourseHeadeing noUnderline'>No Courses Added Yet!</h3>

                                                            : (
                                                                user?.batch?.courses.map((course) => (
                                                                    <CourseCard key={course.courseId} course={course} />
                                                                ))
                                                            )
                                                    )
                                                }
                                            </div>
                                        </div>
                                        : <></>
                                }
                            </div>

                        </div>
                    )
            }

        </>
    );
}

export default UserProfile;