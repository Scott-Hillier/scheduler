import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // Function to access database and book interview
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
      });
      Promise.all([axios.get(`/api/days`)]).then(([days]) => {
        setState((prev) => ({
          ...prev,
          days: days.data,
        }));
      });
    });
  };

  // Function to access database and delete interview
  const deleteInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(async () => {
      await axios.get(`/api/days`).then((res) => {
        setState({
          ...state,
          days: res.data,
        });
      });
    });
  };

  // Fetches relevant information from database
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
