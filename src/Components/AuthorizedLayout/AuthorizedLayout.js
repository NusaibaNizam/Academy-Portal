import { Outlet, useLocation, Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import NavBar from '../NavBar/Navbar';
const AuthorizedLayout = ({roles}) => {
    const {auth}=useAuth()
    const location=useLocation()
    return ( 
        
        auth?.role?.find(r=>roles?.includes(r))
        ?(<>
            <NavBar/>
            <Outlet/>
        </>)
        :auth?.accessToken
        ?<Navigate to="/unauthorized" state={{from:location}} replace/>
        :<Navigate to="/login" state={{from:location}} replace/>
     );
}
 
export default AuthorizedLayout;