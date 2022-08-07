import Cookies from 'js-cookie';

export const get = async (set,setIsLoading, url,controller,isMounted,axiosPrivate,setErrMSG=null) => {
    try {
        const respose = await axiosPrivate.get(url, {
            signal: controller.signal
        })
        isMounted && set(respose.data)
        setErrMSG()
    } catch (e) {
        if (e?.response)
            console.log(e?.response?.data)
            if(setErrMSG){
                setErrMSG(e?.response?.data?.message)
            }
    }
    finally {
        setIsLoading(false)
    }
}
export const handleLogout = (navigate) => {
    
    Cookies.remove('accessToken', { path: '/' })
    Cookies.remove('refreshToken', { path: '/' })
    navigate("/login", { replace: true })
}