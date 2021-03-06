import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// Sets the interviewer when selected and changes the CSS
export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewerClass}
      onClick={(event) => {
        props.setInterviewer(event.target.value);
      }}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
