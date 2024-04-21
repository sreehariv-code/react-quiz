import { useQuiz } from "../context/QuizContext";
function Options() {
  const { questions, dispatch, answer, index } = useQuiz();
  const question = questions[index];
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {questions[index].options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } `}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
