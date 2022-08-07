import './Options.css'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const PendingOptions = () => {
    return ( 
        <>
            <div className="linkContainer">
                <Link className='addBtn' to="/pending_trainees"><FontAwesomeIcon icon={faPeopleGroup} className="addIcon"/>Pending Trainees</Link>
                <Link className='addBtn' to="/pending_trainers"><FontAwesomeIcon icon={faPeopleGroup} className="addIcon"/>Pending Trainers</Link>
    
            </div>
        </> 
        );
}

 
export default PendingOptions;