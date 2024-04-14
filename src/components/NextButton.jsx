import PropTypes from "prop-types";
function NextButton({ dispatch, answer, noOfQuestions, index }) {
  if (answer === null) return null;
  if (index < noOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === noOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;

NextButton.propTypes = {
  dispatch: PropTypes.func,
  answer: PropTypes.number,
  index: PropTypes.number,
  noOfQuestions: PropTypes.number,
};
