import { useQuiz } from "../context/QuizContext";
function NextButton() {
  const { answer, noOfQuestions, index, dispatch } = useQuiz();
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
