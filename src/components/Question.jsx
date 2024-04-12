import PropTypes from "prop-types";
import Options from "./Options";
function Question({ question, dispatch, answer }) {
  //   console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;

Question.propTypes = {
  question: PropTypes.object || null,
  dispatch: PropTypes.func,
  answer: PropTypes.number,
};
