import { createContext, useContext, useEffect, useReducer } from "react";
import data from "../data/questions.json";
const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  //'loading','error','ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.points, state.highscore),
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        secondsRemaining: null,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action Unknown");
  }
}

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const noOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(
    function () {
      // fetch("data/questions.json")
      //   .then((res) => res.json())
      //   .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      //   .catch(() => dispatch({ type: "dataFailed" }));
      async function fetchData() {
        try {
          dispatch({ type: "dataRecieved", payload: data.questions });
        } catch (error) {
          dispatch({ type: "dataFailed" });
        }
      }

      fetchData();
    },
    [dispatch]
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        noOfQuestions,
        maxPoints,
        //Functions

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext is used outside of QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };