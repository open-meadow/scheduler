import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import Appointment from "./Appointment";
import DayList from "./DayList";

import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
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
      interview: {...interview}
    };

    // copy in state.appointments, but change the appointment value to new one
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    // set state with new appointment
    setState({
      ...state,
      appointments
    });

    console.log(appointment, appointments);

    // make put request through axios
    axios.put(`/api/appointments/${id}`, {'interview': interview})
    .then((res) => {
      console.log("res:", res);
    })
    .catch((err) => console.log("Error:", err))
  };

  
  // create appointment form/ appointment details
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewersList = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersList}
        bookInterview = {bookInterview}
      />
    );
  });

  // return
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
