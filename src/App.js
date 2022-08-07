import RegisterLogin from "./Components/RegisterLogin/RegisterLogin";
import { Routes, Route } from 'react-router-dom'
import AuthorizedLayout from "./Components/AuthorizedLayout/AuthorizedLayout";
import Home from "./Components/Home/Home";
import UnauthorizedLayout from "./Components/UnauthirizedLayout/UnauthorizedLayout";
import ErrorElement from "./Components/ErrorElement/ErrorElement";
import PersistLogin from "./Components/PersistLogin/PersistLogin";
import PendingStdents from "./Components/PendingStudents/PendingStudents";
import AddEditCourse from "./Components/AddEditForms/AddEditCourse";
import AddEditBatch from "./Components/AddEditForms/AddEditBatch";
import Options from "./Components/Options/Option";
import UserProfile from "./Components/UserProfile/UserProfile";
import PendingOptions from "./Components/Options/PendingOptions";
import PendingTrainers from "./Components/PendingTrainers/PendingTrainers";
import CourseList from "./Components/CourseList/CourseList";
import BatchList from "./Components/BatchList/BatchList";
import AddEditRecord from "./Components/AddEditForms/AddEditRecord";
import RecordList from "./Components/RecordList/RecordList";
import AddEditSession from "./Components/AddEditForms/AddEditSession";
import SessionList from "./Components/SessionList/SessionList";
import TrainerBatchList from "./Components/BatchList/TrainerBatchList";
import AssignmentOptions from "./Components/Options/AssignmentsOptions";
import AddEditAssignments from "./Components/AddEditForms/AddEditAssignments";
import TrainerAssignmentList from "./Components/AssignmentList/TrainerAssignmentList";
import TrainerCourseList from "./Components/CourseList/TrainerCourseList";
import TrainerTodaySessionList from "./Components/SessionList/TrainerTodaySessionList";
import TrainerEditProfile from "./Components/UserProfile/TrainerEditProfile";
import TrainerSessionList from "./Components/SessionList/TrainerSessionList";
import TraineeAssignmentList from "./Components/AssignmentList/TraineeAssignmentList";
import StudentAnswerSheet from "./Components/AddEditForms/StudentAnswerSheet";
import TraineeAnswerCopyList from "./Components/AsnwerCopyList/StudentAnswerCopyList";
import TrainerAnswerCopyList from "./Components/AsnwerCopyList/TrainerAnswerCopyList";
import MarkAnswerSheet from "./Components/AddEditForms/TrainerAnswerMarkSheet";
import TraineeEditProfile from "./Components/UserProfile/TraineeEditProfile";
import TraineeSessionList from "./Components/SessionList/TraineeSessionList";
import TraineeTodaySessionList from "./Components/SessionList/TraineeTodaySessionList";
import CurrentUsersOptions from "./Components/Options/CurrentUsersOptions";
import CurrentStudentsList from "./Components/CurrentStudentList/CurrentStudentList";
import CurrentTrainersList from "./Components/CurrentTrainersList/CurrentTrainersList";

function App() {

  return (
    <Routes>
      <Route element={<UnauthorizedLayout />}>
        <Route path="login" element={<RegisterLogin />} />

        <Route element={<PersistLogin />}>
          <Route element={<AuthorizedLayout roles={['student', 'trainer', 'admin']} />}>
            <Route path="/" element={<Home />} />
            <Route path="/unauthorized" element={<ErrorElement msg="Unauthorized" />} />
            <Route path="/show_record" element={<RecordList/>}/>
          </Route>
          <Route element={<AuthorizedLayout roles={['admin']} />}>
            <Route path="/pending_trainees" element={<PendingStdents/>}/>
            <Route path="/pending_trainers" element={<PendingTrainers/>}/>
            <Route path="/current_trainees" element={<CurrentStudentsList/>}/>
            <Route path="/current_trainers" element={<CurrentTrainersList/>}/>
            <Route path="/pending" element={<PendingOptions/>}/>
            <Route path="/current" element={<CurrentUsersOptions/>}/>
            <Route path="/add_course" element={<AddEditCourse/>}/>
            <Route path="/edit_course" element={<AddEditCourse/>}/>
            <Route path="/edit_batch" element={<AddEditBatch/>}/>
            <Route path="/add_batch" element={<AddEditBatch/>}/>
            <Route path="/add_record" element={<AddEditRecord/>}/>
            <Route path="/edit_record" element={<AddEditRecord/>}/>
            <Route path="/add_session" element={<AddEditSession/>}/>
            <Route path='/edit_session' element={<AddEditSession/>}/>
            <Route path="/add" element={<Options/>}/>
            <Route path="/lists" element={<Options/>}/>
            <Route path="/show_course" element={<CourseList/>}/>
            <Route path="/show_batch" element={<BatchList/>}/>
            <Route path="/show_session" element={<SessionList/>}/>
            <Route path="/trainee_profile" element={<UserProfile/>}/>
            <Route path="/trainer_profile" element={<UserProfile/>}/>
          </Route>
          <Route element={<AuthorizedLayout roles={['trainer']} />}>
            <Route path="/assignments" element={<AssignmentOptions/>}/>
            <Route path="/add_assignment" element={<AddEditAssignments/>}/>
            <Route path="/edit_assignment" element={<AddEditAssignments/>}/>
            <Route path="/mark_assignment" element={<MarkAnswerSheet/>}/>
            <Route path="/trainer_assignments" element={<TrainerAssignmentList/>}/>
            <Route path="/trainer_batches" element={<TrainerBatchList/>}/>
            <Route path="/trainer_courses" element={<TrainerCourseList/>}/>
            <Route path="/trainer_session" element={<TrainerSessionList/>}/>
            <Route path="/trainer_session_today" element={<TrainerTodaySessionList/>}/>
            <Route path="/submissions" element={<TrainerAnswerCopyList/>}/>
            <Route path="/trainer_profile_edit" element={<TrainerEditProfile/>}/>
          </Route>
          <Route element={<AuthorizedLayout roles={['student']} />}>
            <Route path="/trainee_assignments" element={<TraineeAssignmentList/>}/>
            <Route path="/trainee_answers" element={<TraineeAnswerCopyList/>}/>
            <Route path="/trainee_session" element={<TraineeSessionList/>}/>
            <Route path="/trainee_session_today" element={<TraineeTodaySessionList/>}/>
            <Route path="/answer_assignment" element={<StudentAnswerSheet/>}/>
            <Route path="/trainee_profile_edit" element={<TraineeEditProfile/>}/>
          </Route>
        </Route>

        <Route path="/*" element={<ErrorElement msg="Not Found" />} />
      </Route>
    </Routes>
  );
}

export default App;
