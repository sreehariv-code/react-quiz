import { useEffect, useReducer } from "react";
import {
  Header,
  Error,
  Loader,
  Main,
  StartScreen,
  Question,
  NextButton,
  Progress,
  FinishScreen,
  Timer,
  Footer,
} from "./components";
import data from "./data/questions.json";

// import data from "./data/questions.json";
const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  //'loading','error','ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
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

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const noOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
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
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen noOfQuestions={noOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              noOfQuestions={noOfQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                index={index}
                noOfQuestions={noOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
