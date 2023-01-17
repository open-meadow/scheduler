import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import axios from "axios";

export default function useApplicationData() {
  // initialize reducer variables and functions
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY: {
        return {
          ...state,
          day: action.day,
        };
      }
      case SET_APPLICATION_DATA: {
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      }
      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: action.appointments,
          days: action.days,
        };
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

  // const [webSocket, setWebSocket] = useState(null);

  // const test = useCallback(() => {
  //   console.log("state-test", state);
  // }, [state]);

  // useEffect(() => {
  //   console.log("state useeffect", state);
  // }, [state])

  // open web-socket
  // useRef makes it so event only happens once. it can be references but not changed
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8001", "protocolOne");
    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    // const ws = new WebSocket("ws://localhost:8001", "protocolOne");
    // setWebSocket(ws);
    if (!ws.current) {
      return;
    } else {
      ws.current.onopen = (event) => {
        console.log("Connected to WebSocket!!!");

        // send 'ping' on the server
        ws.current.send("ping");

        // const message = {
        //   type: "NOTIFICATION",
        //   content: "The record was created",
        //   severity: "LOW",
        //   timestamp: 387250200000
        // };
      };

      ws.current.onmessage = (event) => {
        // test();
        const message = JSON.parse(event.data);
        // console.log("Message Recieved:", message);
        console.log("state:", state);
        // console.log("event data type", message.type);
        // console.log("event data type", message.id);
        // console.log("event data type", message.interview);

        if (message.type === "SET_INTERVIEW") {
          console.log("now");

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
  }, [state]);

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

  // update slots
  const updatedDays = (appointments, appointmentId) => {
    console.log("state-updays", state);
    console.log("appt-id: ", appointmentId);

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
