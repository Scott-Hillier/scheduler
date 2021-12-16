import { useState } from "react";

// Sets the display and keeps track
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history] = useState([initial]);

  function transition(mode, replace) {
    if (replace) {
      history.pop();
      history.push(mode);
      setMode(mode);
    } else {
      history.push(mode);
      setMode(mode);
    }
  }
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    } else {
      setMode(history[0]);
    }
  }

  return { mode, transition, back };
}
