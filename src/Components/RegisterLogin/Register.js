import { useState,useEffect, useRef } from "react";
import { Alert } from "react-bootstrap";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "../../api/axios";
const emailRegex=/^(.+)@(.+)$/;
const STUDENT_REGISTER_URL='/trainee_register'
const TRAINER_REGISTER_URL='/trainer_register'

const Register = (props) => {  
    const [alertClass,setAlertClass]=useState('hidden')
    const [errorMsg,setErrormsg]=useState()
    const [emailError,setEmailError]=useState(false)
    const [nameError,setNameError]=useState(false)
    const [passError,setPassError]=useState(false)
    const [disabled,setDisabled]=useState(false)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    const [varient,setVarient]=useState('success')
    const nameRef=useRef()

    useEffect(()=>{
        if(props.containerName!==''){
            nameRef.current.focus()
        }
    },[props.containerName])
    
    useEffect(()=>{
        setEmailError(email.length!==0 && !emailRegex.test(email))
    },[email])
    
    useEffect(()=>{
        setNameError(name.length!==0 && name.length<6)
    },[name])
    
    useEffect(()=>{
        setPassError(pass.length!==0 && pass.length<4)
    },[pass])

    useEffect(()=>{
        setErrormsg('')
        setAlertClass('hidden')
    },[pass,name,email])

    useEffect(()=>{
        
        setDisabled(
            pass.length<1 || name.length<1 || email.length<1 ||
            emailError || passError || nameError
        )
    },[pass,name,email,emailError,passError,nameError])
    

    const handleSuccess=(response)=>{
        setErrormsg('Registered, but account is currently locked for varification')
        setAlertClass('')
        setVarient('success')
    }

    const handleError=(e)=>{
        if(!e?.response?.data){
            setErrormsg('No Server Response')
        }else if(e.response?.data?.message){
            setErrormsg(e.response?.data.message)
        }else{
            setErrormsg('Registration Failed')
        }
        setAlertClass('')
        setVarient('danger')
    }
    const handleStudentOnclick=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post(STUDENT_REGISTER_URL,{
                email, name, pass
            })
            handleSuccess(response)
        }catch(e){
           handleError(e)
        }
    }
    const handleTrainerOnclick=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post(TRAINER_REGISTER_URL,{
                email, name, pass
            })
            handleSuccess(response)
        }catch(e){
            handleError(e)
        }
    }
    return (
        <>
            <div className="formContainer signupContainer">
                <form className="loginForm">
                    <Alert variant={varient} className={alertClass}>
                            <Alert.Heading>{errorMsg}</Alert.Heading>
                    </Alert>
                    <h1 className="loginHeader">Create Account</h1>
                    <input className="loginInput" type="text" placeholder="Name" ref={nameRef} onChange={e=>{setName(e.target.value)}}  value={name}  />
                    <p className={nameError?"fieldError":"hidden"}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> Minimum lenght of name is 6</p>
                    <input className="loginInput" type="email" placeholder="Email" onChange={e=>{setEmail(e.target.value)}} value={email} />
                    <p className={emailError?"fieldError":"hidden"} ><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> Email has to be valid</p>
                    <input className="loginInput" type="password" placeholder="Password" onChange={e=>{setPass(e.target.value)}}   value={pass}/>
                    <p className={passError?"fieldError":"hidden"}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> Minimum lenght of password is 4</p>
                    <button className="loginButton" disabled={disabled} onClick={handleStudentOnclick}>As Student</button>
                    <span>or</span>
                    <button className="loginButton" disabled={disabled} onClick={handleTrainerOnclick}>As Trainer</button>
                </form>
            </div>
        </>
    );
}

export default Register;