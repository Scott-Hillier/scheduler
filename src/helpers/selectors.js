function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDays = state.days.find((selectDay) => selectDay.name === day);
  const filteredDaysAppointments = filteredDays
    ? filteredDays.appointments
    : [];

  const data = [];
  filteredDaysAppointments.forEach((appointmentId) => {
    for (const key in state.appointments) {
      if (appointmentId == key) {
        data.push(state.appointments[key]);
      }
    }
  });
  return data;
}

function getInterview(state, interview) {
  if (interview !== null) {
    const interviewerId = interview.interviewer;
    const interviewInfo = {
      student: interview.student,
      interviewer: state.interviewers[interviewerId],
    };
    return interviewInfo;
  } else {
    return null;
  }
}

function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDays = state.days.find((selectDay) => selectDay.name === day);
  const filteredDaysInterviewers = filteredDays
    ? filteredDays.interviewers
    : [];

  const data = [];
  filteredDaysInterviewers.forEach((interviewerId) => {
    for (const key in state.interviewers) {
      if (interviewerId == key) {
        data.push(state.interviewers[key]);
      }
    }
  });
  return data;
}

module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
};
