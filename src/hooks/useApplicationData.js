import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const spotsRemaining = (input) => {
    return state.days.map((day) => {
      if (day.name === state.day && input) {
        day.spots -= 1;
      }
      if (day.name === state.day && !input) {
        day.spots += 1;
      }
      return day;
    });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log(id, interview);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      console.log("call");
      setState({
        ...state,
        appointments,
        days: spotsRemaining(true),
      });
    });
  };

  const deleteInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        days: spotsRemaining(false),
      });
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, deleteInterview };
}
