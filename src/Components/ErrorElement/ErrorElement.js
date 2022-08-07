import "./ErrorElement.css"
// import { Helmet } from "react-helmet-async";

const ErrorElement = (props) => {
    return ( 
        <>
        {/* <Helmet>
            <title>Error</title>
        </Helmet> */}
        <div className="cardContainer">
            
        <div className="error_container">
            <p className="error_big">oops!</p>
            <p className="error_small">{props.msg}</p>
        </div>
        </div>
        </>
     );
}
 
export default ErrorElement;