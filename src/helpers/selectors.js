export default function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  console.log(state.days);
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
