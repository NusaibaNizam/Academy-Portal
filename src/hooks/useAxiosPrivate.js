import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefresh from "./useRefreshToken";
import useAuth from "./useAuth";
import Cookies from "js-cookie";
const useAxiosPrivate = () => {
    const refresh=useRefresh()
    const {auth}=useAuth()
    useEffect(()=>{

        const requestIntercepter=axiosPrivate.interceptors.request.use(
            config=>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization']='Bearer '+Cookies.get('accessToken') 
                }
                return config
            },(error)=>Promise.reject(error)
        )

        const responseIntercepter=axiosPrivate.interceptors.response.use(
            response=>response,
            async(error)=>{
                const prevReq=error?.config
                if(auth?.username && error?.response?.status===401 && !prevReq?.sent){
                    prevReq.sent=true
                    const newAccessToken= await refresh()
                    prevReq.headers['Authorization']='Bearer '+newAccessToken
                    return axiosPrivate(prevReq)
                }
                return Promise.reject(error)
            }
        )
        return ()=>{
            axiosPrivate.interceptors.request.eject(requestIntercepter)
            axiosPrivate.interceptors.response.eject(responseIntercepter)
        }
    },[auth,refresh])

    return axiosPrivate;
}
 
export default useAxiosPrivate;