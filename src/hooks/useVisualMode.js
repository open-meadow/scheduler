import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newVal, replace = false) => {
    setHistory((prev) =>
      replace ? [...prev.slice(0, -1), newVal] : [...prev, newVal]
    );
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  };

  return { mode: history[history.length - 1], transition, back };
}
