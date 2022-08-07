import axios from "../api/axios";
import useAuth from "./useAuth";
import Cookies from "js-cookie";
const useRefresh = () => {
    const {setAuth}=useAuth()
    const refresh= async ()=>{
        try{
            const response=await axios.get('/refresh',{ headers: { Authorization: 'Bearer '+Cookies.get('refreshToken') } },{withCredentials:true});
            const accessToken=response?.data?.accessToken
            const refreshToken=response?.data?.refreshToken
            const role=response?.data?.role
            const username=response?.data?.username
            const id=response?.data?.id
            Cookies.set('accessToken',accessToken, { path: '/', secure: true, expires: new Date(Date.now()+(5*60*60*1000))} )
            Cookies.set('refreshToken',refreshToken, { path: '/', secure: true, expires: new Date(Date.now()+(5*60*60*1000*10))} )
            setAuth({username,id,role,accessToken,refreshToken})
            return response.data.accessToken
        }catch(e){
        }
    }

    return refresh;
}
 
export default useRefresh;