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

module.exports = {
  getAppointmentsForDay: getAppointmentsForDay,
  getInterview: getInterview,
};
