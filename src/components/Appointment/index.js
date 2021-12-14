import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import { tsPropertySignature } from "@babel/types";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  let { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW, true);
    });
  };
  const deleteForm = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING);
    props.deleteInterview(props.id, interview).then(() => {
      transition(EMPTY, true);
    });
  };

  const edit = (name, interviewer) => {
    transition(CREATE, false);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      <div>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE, false)} />}
        {mode === SHOW && (
          <Show
            student={props.interview ? props.interview.student : null}
            interviewer={
              props.interview ? props.interview.interviewer.name : null
            }
            onDelete={() => transition(CONFIRM, false)}
            onEdit={() => edit(props.student, props.interview.interviewer.id)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onCancel={() => back(EMPTY)}
            onSave={(student, interviewer) => save(student, interviewer)}
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onCancel={() => back()}
            onConfirm={() => deleteForm()}
          />
        )}
      </div>
    </article>
  );
}
