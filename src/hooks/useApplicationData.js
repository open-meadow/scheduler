import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer (state, action) {
    switch(action.type) {
      case SET_DAY: {
        return { 
          ...state, 
          day: action.day 
        }
      }
      case SET_APPLICATION_DATA: {
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        }
      }
      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: action.appointments,
          days: action.days
        }
      }
      default: {
        throw new Error(
          `Trying to reduce with unsupported action type: ${action.type}`
        );
      }
    }
  }

  // set default state
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  // Promise to retrieve days, appointments and interviewers
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  // allow users to book interviews
  const bookInterview = (id, interview) => {
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
        dispatch({
          type: SET_INTERVIEW,
          appointments,
          days: updatedDays(appointments, id) 
        });
      });
  };

  // update slots
  const updatedDays = (appointments, appointmentId) => {
    const apptDay = state.days.find(day => day.appointments.includes(appointmentId));
    
    const spots = apptDay.appointments.filter(id => appointments[id].interview === null).length;

    return state.days.map(x => x.appointments.includes(appointmentId) ? {...x, spots} : x);
  };

  // interview cancel function
  const cancelInterview = (id) => {
    // copy in state.appointments, but change the interview value to new one
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    // copy in state.appointments, but change the appointment value to new one
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        appointments,
        days: updatedDays(appointments, id) 
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
