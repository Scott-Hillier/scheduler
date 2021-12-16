import React from "react";
import "components/Appointment/styles.scss";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR DELETE";

// This controls all relevant information for booking appointments
// Passes down necessary props and controls the transitions between displays
export default function Appointment(props) {
  let { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    console.log(props.id, interview);
    Promise.resolve(props.bookInterview(props.id, interview))

      .then(() => {
        console.log("something");
        transition(SHOW);
      })
      .catch((error) => {
        console.log("text");
        transition(ERROR_SAVE, true);
      });
  };

  const deleteForm = (event) => {
    transition(DELETING, true);
    props
      .deleteInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      <div>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student ? props.interview.student : null}
            interviewer={
              props.interview.interviewer
                ? props.interview.interviewer.name
                : null
            }
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(CREATE)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            student={props.interview ? props.interview.student : null}
            interviewer={
              props.interview ? props.interview.interviewer.id : null
            }
            onCancel={() => back()}
            onSave={(student, interviewer) => save(student, interviewer)}
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === ERROR_SAVE && (
          <Error message="ERROR: could not save" onClose={() => back()} />
        )}
        {mode === ERROR_DELETE && (
          <Error message="ERROR: could not delete" onClose={() => back()} />
        )}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onCancel={() => back()}
            onConfirm={(interview) => deleteForm(interview)}
          />
        )}
      </div>
    </article>
  );
}
