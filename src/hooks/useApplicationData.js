import { useCallback, useEffect, useReducer, useRef } from "react";
import axios from "axios";
import {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  reducer,
} from "reducers/application";

export default function useApplicationData() {
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

  // update slots - useCallback makes it so it can be used in useEffect without causing linting errors
  const updatedDays = useCallback((appointments, appointmentId) => {
    // check which day has correct appointment
    const apptDay = state.days.find((day) =>
      day.appointments.includes(appointmentId)
    );

    // calculate new spots value
    const spots = apptDay.appointments.filter(
      (id) => appointments[id].interview === null
    ).length;

    // {...x, spots} updates x.spots. else it just returns x
    return state.days.map((x) =>
      x.appointments.includes(appointmentId) ? { ...x, spots } : x
    );
  }, [state.days]);

  // open web-socket
  // useRef makes it so event only happens once. it can be referenced but not changed
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket("ws://scheduler-api-production-3e53.up.railway", "protocolOne");
    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) {
      return;
    } else {
      ws.current.onopen = (event) => {
        console.log("Connected to WebSocket!!!");

        // send 'ping' on the server
        ws.current.send("ping");
      };

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "SET_INTERVIEW") {
          const appointment = {
            ...state.appointments[message.id],
            interview: message.interview,
          };

          const appointments = {
            ...state.appointments,
            [message.id]: appointment,
          };

          const days = updatedDays(appointments, message.id);

          dispatch({
            type: message.type,
            appointments,
            days,
          });
        }
      };
    }
  }, [state, updatedDays]);

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
          days: updatedDays(appointments, id),
        });
      });
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
        days: updatedDays(appointments, id),
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
