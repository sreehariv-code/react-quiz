import PropTypes from "prop-types";
function StartScreen({ noOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{noOfQuestions} question to test your React mastery</h3>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let&apos;s Start
      </button>
    </div>
  );
}

StartScreen.propTypes = {
  noOfQuestions: PropTypes.number,
  dispatch: PropTypes.func,
};
export default StartScreen;
