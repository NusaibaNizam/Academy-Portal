import { Outlet } from 'react-router-dom'
const UnauthorizedLayout = () => {
    return ( 
        <>
        <div className='App'>
            <Outlet/>
        </div>
        </>
     );
}
 
export default UnauthorizedLayout;