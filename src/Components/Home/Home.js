import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
const Home = () => {
    const times = (length, fn) => Array.from({ length }, (_, i) => fn(i));
    return (
        <>
            <div className="context">
                <h1>Welcome to our Academy!</h1>
            </div>


            <div className="area" >
                <ul className="circles">
                    {times(10, i => <li key={i} ><FontAwesomeIcon icon={faGraduationCap} size='7x'/></li>)}
                </ul>
            </div >
        </>
    );
}

export default Home;