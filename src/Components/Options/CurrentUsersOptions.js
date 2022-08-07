import './Options.css'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const CurrentUsersOptions = () => {
    return ( 
        <>
            <div className="linkContainer">
                <Link className='addBtn' to="/current_trainees"><FontAwesomeIcon icon={faPeopleGroup} className="addIcon"/>Current Trainees</Link>
                <Link className='addBtn' to="/current_trainers"><FontAwesomeIcon icon={faPeopleGroup} className="addIcon"/>Current Trainers</Link>
    
            </div>
        </> 
        );
}

 
export default CurrentUsersOptions;