import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newVal, replace = false) => {
    if(replace) history.pop();
    history.push(newVal);
    return setMode(newVal);
  };

  const back = () => {
    if (history.length - 1 > 0) {
      history.pop();
      return setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
}
