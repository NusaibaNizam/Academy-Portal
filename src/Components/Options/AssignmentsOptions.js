import './Options.css'
import { faList, faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const AssignmentOptions = () => {
    return ( 
        <>
            <div className="linkContainer">
                <Link className='addBtn' to="/trainer_assignments"><FontAwesomeIcon icon={faList} className="addIcon"/>All Assignments</Link>
                <Link className='addBtn' to="/add_assignment"><FontAwesomeIcon icon={faAdd} className="addIcon"/>Add Assignment</Link>
    
            </div>
        </> 
        );
}

 
export default AssignmentOptions;