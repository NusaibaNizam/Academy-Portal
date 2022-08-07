import User from "../Data/User";
import Course from "../Data/Course";
import "./DataContainer.css"
import Batch from "../Data/Batch";
import Record from "../Data/Record"
import Session from "../Data/Session";
import Assignment from "../Data/Assignment";
import AnswerCopy from "../Data/AnswerCopy";

const DataContainer = (props) => {
    return (
        <>



            {props.typeUrl === 'course' ?
                <div className="cardContainer">
                    <h1 style={{ textAlign: 'center', width: '80vw', color: '#516c96', textDecoration: 'underline dashed' }}>Courses</h1>
                    {
                        props.course?.length === 0 ?
                            <h1 style={{ textAlign: 'center', width: '80vw', color: '#516c96' }}>No {props.typeUrl.toUpperCase()} Available</h1> :
                            props.course?.map(datas =>
                                <Course
                                    key={datas?.courseId}
                                    name={datas?.name}
                                    credit={datas?.credit}
                                    trainer={datas?.trainer}
                                    typeUrl={props.typeUrl}
                                    id={datas?.courseId}
                                    setIsDeleted={props.setIsDeleted}
                                />
                            )
                    }
                </div>
                :props.typeUrl==='batch'?
                <div className="cardContainer">
                    
                    <h1 style={{ textAlign: 'center', width: '80vw', color: '#516c96', textDecoration: 'underline dashed' }}>Batches</h1>
                    {
                        props.batch?.length === 0 ?
                            <h1 style={{ textAlign: 'center', width: '80vw', color: '#516c96' }}>No {props.typeUrl.toUpperCase()} Available</h1> :
                            props.batch?.map(datas =>
                                <Batch
                                    key={datas?.batchId}
                                    name={datas?.name}
                                    courses={datas?.courses}
                                    typeUrl={props.typeUrl}
                                    id={datas?.batchId}
                                    setIsDeleted={props.setIsDeleted}
                                />
                            )
                    }
                </div>
                :props.typeUrl==='record'?
                <div className="cardContainer">
                    
                    <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96', textDecoration: 'underline dashed' }}>Training Records</h1>
                    {
                        props.record?.length === 0 ?
                            <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96' }}>No Training&nbsp;{props.typeUrl.toUpperCase()} Available</h1> :
                            props.record?.map(datas =>
                                <Record
                                    key={datas?.recordId}
                                    name={datas?.name}
                                    batch={datas?.batch}
                                    startingDate={datas?.startingDate}
                                    endingDate={datas?.endingDate}
                                    typeUrl={props.typeUrl}
                                    id={datas?.recordId}
                                    setIsDeleted={props.setIsDeleted}
                                />
                            )
                    }
                </div>
                :props.typeUrl==='session'?
                <div className="cardContainer">
                    
                    <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96', textDecoration: 'underline dashed' }}>Training Sessions</h1>
                    {
                        props.session?.length === 0 ?
                            <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96' }}>No Training&nbsp;{props.typeUrl.toUpperCase()} Available</h1> :
                            props.session?.map(datas =>
                                <Session
                                    key={datas?.sessionId}
                                    name={datas?.name}
                                    course={datas?.course}
                                    startingTime={datas?.startingTime}
                                    endingTime={datas?.endingTime}
                                    weekDay={datas?.weekDay}
                                    typeUrl={props.typeUrl}
                                    id={datas?.sessionId}
                                    setIsDeleted={props.setIsDeleted}
                                />
                            )
                    }
                </div>
                :props.typeUrl==='assignment'&&props.assignment?
                <div className="cardContainer">
                    
                    <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96', textDecoration: 'underline dashed' }}>Assignments</h1>
                    {
                        props.assignment?.length === 0 ?
                            <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96' }}>No {props.typeUrl.toUpperCase()} Available</h1> :
                            props.assignment?.map(datas =>
                                <Assignment
                                    key={datas?.assignmentId}
                                    name={datas?.name}
                                    batch={datas?.batch}
                                    deadLine={datas?.deadLine}
                                    mark={datas?.mark}
                                    description={datas?.description}
                                    trainer={datas?.trainer}
                                    typeUrl={props.typeUrl}
                                    id={datas?.assignmentId}
                                    setIsDeleted={props.setIsDeleted}
                                />
                            )
                    }
                </div>
                :props.typeUrl==='assignment'?
                <div className="cardContainer">
                    
                    <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96', textDecoration: 'underline dashed' }}>Due Assignments</h1>
                    {
                        props.answerCopy?.length === 0 ?
                            <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96' }}>No {props.typeUrl.toUpperCase()} Available</h1> :
                            props.answerCopy?.map(datas =>
                                <Assignment
                                    key={datas?.assignment?.assignmentId}
                                    name={datas?.assignment?.name}
                                    batch={datas?.assignment?.batch}
                                    deadLine={datas?.assignment?.deadLine}
                                    mark={datas?.assignment?.mark}
                                    description={datas?.assignment?.description}
                                    trainer={datas?.assignment?.trainer}
                                    typeUrl={props.typeUrl}
                                    id={datas?.assignment?.assignmentId}
                                    answerCopy={datas}
                                    setIsDeleted={props.setIsDeleted}
                                />
                            )
                    }
                </div>
                :props.typeUrl==='answer_copy'?
                <div className="cardContainer">
                    
                    <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96', textDecoration: 'underline dashed' }}>Submissions</h1>
                    {
                        props.answerCopy?.length === 0 ?
                            <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96' }}>No {props.typeUrl.toUpperCase()} Available</h1> :
                            props.answerCopy?.map(datas =>
                                <AnswerCopy
                                    key={datas?.assignment?.assignmentId}
                                    answerCopy={datas}
                                    setIsDeleted={props.setIsDeleted}
                                />
                            )
                    }
                </div>
                :<div className="cardContainer">
                    
                    <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96', textDecoration: 'underline dashed' }}>{props.typeUrl.toUpperCase()}</h1>
                    {
                        props.users?.length === 0 ?
                            <h1  style={{ textAlign: 'center', width: '80vw', color: '#516c96' }}>No {props.typeUrl.toUpperCase()} {props?.currrent?'':'pending'}</h1> :
                            props.users?.map(datas =>
                                <User
                                    key={datas?.uid}
                                    name={datas?.name}
                                    roles={datas?.roles}
                                    email={datas?.email}
                                    id={datas?.uid}
                                    typeUrl={props.typeUrl}
                                    setIsDeleted={props.setIsDeleted}
                                />
                            )
                    }
                </div>
            }




        </>
    );
}

export default DataContainer;