import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import Appointment from "./Appointment";
import DayList from "./DayList";

const appointments = {
  1: {
    id: 1,
    time: "12pm",
  },
  2: {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  3: {
    id: 3,
    time: "2pm",
  },
  4: {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      },
    },
  },
  5: {
    id: 5,
    time: "4pm",
  },
};

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");

  useEffect(() => {
    axios.get("/api/days")
    .then((response) => {
      console.log("api-days response", response.data);
      setDays(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])
  
  
  const appointmentValues = Object.values(appointments);
  const appointmentArr = appointmentValues.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
    );
  });

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
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
