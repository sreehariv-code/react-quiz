import { useEffect } from "react";
import p from "prop-types";

export default function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      //Cleanup function to reset the timer when the component unmounts (stop the working of timer after component unmount)
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

Timer.propTypes = {
  dispatch: p.func,
  secondsRemaining: p.number,
};
