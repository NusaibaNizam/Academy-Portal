import './Options.css'
import { faBookOpen, faClock, faPencilRuler, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
const Options = () => {
    const location=useLocation()
    return ( 
        <>
            <div className="linkContainer">
                <Link className='addBtn' to={location.pathname==='/add'?"/add_course":"/show_course"} state={{from:location}}><FontAwesomeIcon icon={faBookOpen} className="addIcon"/>Course</Link>
                <Link className='addBtn' to={location.pathname==='/add'?"/add_batch":"/show_batch"} state={{from:location}}><FontAwesomeIcon icon={faPeopleGroup} className="addIcon"/>Batch</Link>
                <Link className='addBtn' to={location.pathname==='/add'?"/add_session":"/show_session"} state={{from:location}}><FontAwesomeIcon icon={faClock} className="addIcon"/>Weekly Session</Link>
                <Link className='addBtn' to={location.pathname==='/add'?"/add_record":"/show_record"} state={{from:location}}><FontAwesomeIcon icon={faPencilRuler} className="addIcon"/>Training Record</Link>
    
            </div>
        </> 
        );
}

 
export default Options;