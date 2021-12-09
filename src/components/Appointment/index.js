import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header>{props.time}</Header>
      <div>
        {props.interview ? (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
          />
        ) : (
          <Empty />
        )}
      </div>
    </article>
  );
}
