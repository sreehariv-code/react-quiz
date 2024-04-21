import { useQuiz } from "../context/QuizContext";

function StartScreen() {
  const { noOfQuestions, dispatch } = useQuiz();
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

export default StartScreen;
