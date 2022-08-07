import { useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const LOGIN_URL='/authenticate'
const Login = (props) => {
    const navigate=useNavigate()
    const location=useLocation()
    const from=location.state?.from?.pathname||"/";
    const {setAuth}=useAuth()
    const [alertClass,setAlertClass]=useState('hidden')
    const [errorMsg,setErrormsg]=useState()
    const [pass,setPass]=useState('')
    const [email,setEmail]=useState('')
    const emailRef=useRef()
    useEffect(()=>{
        if(props.containerName===''){
            emailRef.current.focus()
        }
    },[props.containerName])

    useEffect(()=>{
        setErrormsg('')
        setAlertClass('hidden')
    },[email,pass])

    const handleSubmit= async (e)=>{
        e.preventDefault();

        try{
            const response= await axios.post(LOGIN_URL,{
                username:email,password:pass
            })
            const accessToken=response?.data?.accessToken
            const refreshToken=response?.data?.refreshToken
            const role=response?.data?.role
            const username=response?.data?.username
            const id=response?.data?.id
            Cookies.set('accessToken',accessToken, { path: '/', secure: true, expires: new Date(Date.now()+(5*60*60*1000))} )
            Cookies.set('refreshToken',refreshToken, { path: '/', secure: true, expires: new Date(Date.now()+(5*60*60*1000*10))} )
            setAuth({username,id,role,accessToken,refreshToken})
            navigate(from,{replace:true})
        }catch(e){
            if(!e?.response?.data){
                setErrormsg('No Server Response')
            }else if(e.response?.data?.message){
                setErrormsg(e.response?.data.message)
            }else{
                setErrormsg('Login Failed')
            }
            setAlertClass('')
        }
    }
    return (
        <>
            <div className="formContainer signinContainer">
                <form className="loginForm" onSubmit={handleSubmit}>
                    <Alert variant="danger" className={alertClass}>
                        <Alert.Heading>{errorMsg}</Alert.Heading>
                    </Alert>
                    <h1 className="loginHeader">Sign in</h1>
                    <input className="loginInput" type="email" placeholder="Email" ref={emailRef} value={email} onChange={e=>{setEmail(e.target.value)}}/>
                    <input className="loginInput" type="password" placeholder="Password" value={pass} onChange={e=>{setPass(e.target.value)}}/>
                    <button className="loginButton">Sign In</button>
                </form>
            </div>
        </>
    );
}

export default Login;