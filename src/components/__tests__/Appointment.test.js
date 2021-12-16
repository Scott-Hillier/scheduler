/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";
import { useState } from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "components/Application";

/*
A test that renders a React Component
*/

describe("Appointment", () => {
  const fakeInterview = {
    student: "STUDENT",
    interviewer: { id: 2, name: "INTEVIEWER_NAME", avatar: "URL" },
  };
  const fakeDailyInterviewers = [
    { id: 3, name: "DAILY_INTERVIEWER_NAME", avatar: "URL" },
  ];
  const fakeFunction = () => {};

  it("renders without crashing", () => {
    render(
      <Appointment
        key={1}
        id={1}
        time={"1pm"}
        interview={fakeInterview}
        interviewers={fakeDailyInterviewers}
        bookInterview={fakeFunction}
        deleteInterview={fakeFunction}
      />
    );
  });
});
