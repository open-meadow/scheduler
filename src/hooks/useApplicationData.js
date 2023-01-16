import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  // set default state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // Promise to retrieve days, appointments and interviewers
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => console.log(error));
  }, []);

  // allow users to book interviews
  const bookInterview = (id, interview) => {
    console.log("interview", interview);

    // copy in state.appointments, but change the interview value to new one
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // copy in state.appointments, but change the appointment value to new one
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // make put request through axios. return promise object back to appointment
    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        // set state with new appointment
        setState({
          ...state,
          appointments,
        });
      });
  };

  // interview cancel function
  const cancelInterview = (id, interview) => {
    // copy in state.appointments, but change the interview value to new one
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // copy in state.appointments, but change the appointment value to new one
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview }
}
