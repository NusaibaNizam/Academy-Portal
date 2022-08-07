import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import { handleLogout } from '../services';
const NavBar = () => {
    const navigate = useNavigate()
    const logout=()=> handleLogout(navigate)
    const { auth } = useAuth()
    return (<>
        <div className="navbar">
            <ul>
                <li>
                    <h1>{auth?.username}</h1>
                </li>

                <div>

                    <li>
                        <button className="logout" onClick={logout}>Logout</button>
                    </li>
                    <div className='dropdown'>
                        <FontAwesomeIcon icon={faBars} className='dropdown_button' />
                        <div className="dropdownMenu">
                            <li>

                                <Link to="/">Home</Link>
                            </li>
                            
                            {
                                auth?.role.includes('admin') &&
                                (<>
                                    <li>

                                        <Link to="/pending">Pending Users</Link>
                                    </li>
                                    <li>

                                        <Link to="/current">Current Users</Link>
                                    </li>
                                    <li>

                                        <Link to="/add">Add Operations</Link>
                                    </li>

                                    <li>

                                        <Link to="/lists">Other Operations</Link>
                                    </li>
                                </>
                                )
                            }{
                                auth?.role.includes('trainer') &&
                                (<>
                                    <li>

                                        <Link to="/trainer_profile_edit">My Profile</Link>
                                    </li>
                                    <li>

                                        <Link to="/trainer_batches">My Batches</Link>
                                    </li>
                                    <li>

                                        <Link to="/assignments">Assignment Panel</Link>
                                    </li>
                                    <li>

                                        <Link to="/submissions">Submissions</Link>
                                    </li>
                                    <li>

                                        <Link to="/trainer_courses">My Courses</Link>
                                    </li>
                                    <li>

                                        <Link to="/trainer_session">My Training Sessions</Link>
                                    </li>
                                    <li>

                                        <Link to="/trainer_session_today">Today's Training Sessions</Link>
                                    </li>
                                </>
                                )
                            }{
                                auth?.role.includes('student') &&
                                (<>
                                
                                    <li>

                                        <Link to="/trainee_profile_edit">My Profile</Link>
                                    </li>
                                    
                                    <li>

                                        <Link to="/trainee_assignments">Due Assignments</Link>
                                    </li>
                                    <li>

                                        <Link to="/trainee_answers">My Submissions</Link>
                                    </li>
                                    <li>

                                        <Link to="/trainee_session">My Training Sessions</Link>
                                    </li>
                                    <li>

                                        <Link to="/trainee_session_today">Today's Training Sessions</Link>
                                    </li>
                                </>)
                            }
                            {
                                !auth?.role.includes('admin') &&
                                (<>
                                    <li>

                                        <Link to="/show_record">Training Records</Link>
                                    </li>
                                </>)
                            }
                        </div>

                    </div>

                </div>

            </ul>
        </div>
    </>);
}

export default NavBar;