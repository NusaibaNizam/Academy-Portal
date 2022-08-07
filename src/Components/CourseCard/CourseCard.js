import './CourseCard.css'
const CourseCard = ({course}) => {
    return ( 
        <>
            <div className="courseCard">
                <div className="upperPanale">
                    <h2>{course.name}</h2>
                </div>
                <div className="bottomPanale">
                    <h4>Credit:&nbsp;{course.credit}</h4>
                    <h4>Trainer:&nbsp;{course.trainer.name}</h4>
                </div>
            </div>
        </>
     );
}
 
export default CourseCard;