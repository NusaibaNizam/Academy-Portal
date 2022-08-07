import './UserProfile.css'
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from '../Loading/Loading';
import { get, handleLogout } from '../services';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const TrainerEditProfile = () => {
    const navigate=useNavigate()
    const {auth}=useAuth()
    const [trainer, setTrainer] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const axiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        get(setTrainer, setIsLoading, '/api/trainers?id=' + auth?.id, controller, isMounted, axiosPrivate)
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [axiosPrivate, auth])
    useEffect(()=>{
        setName(trainer.name)
        setEmail(trainer.email)
    },[trainer])
    
    const handleUpdate = async (e) => {
        e.preventDefault()
        const trainerRes = {
            name,
            email,
            pass: trainer.pass,
            accepted: true
        }
        console.log(trainerRes)
        try {
            await axiosPrivate.put( '/api/trainers?id=' + auth?.id, trainerRes)
            handleLogout(navigate)
        } catch (e) {
            if (e?.response)
                console.log(e?.response?.data)
        }
    }
    return (
        <>
            {
                (isLoading) ? <Loading />
                    : (
                        <div className="profileContainer">

                            <div className="boxProfile" style={{width:'25vw'}}>
                                <div className="mainProfile">

                                    <div className="imgContainerProfile">
                                        <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="profile" />
                                    </div>
                                    <form onSubmit={handleUpdate}>
                                        <h2 className="bio"  style={{marginTop:'1vh'}}>Name: {trainer.name} </h2>
                                        <input type="text" placeholder='Edit name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                                        <h2 className="bio"  style={{marginTop:'1vh'}}>Email: {trainer.email}</h2>
                                        <input type="text" placeholder='Edit email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                                        
                                        <button type='submit' className="btnProfile" >
                                                Update and Login
                                        </button>
                                    </form>
                                </div>

                            </div>

                        </div>
                    )
            }

        </>
    );
}

export default TrainerEditProfile;