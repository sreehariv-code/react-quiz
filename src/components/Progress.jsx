import PropTypes from "prop-types";
function Progress({ index, noOfQuestions, points, maxPoints, answer }) {
  console.log(answer);
  return (
    <header className="progress">
      <progress max={noOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{noOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;

Progress.propTypes = {
  index: PropTypes.number,
  noOfQuestions: PropTypes.number,
  points: PropTypes.number,
  maxPoints: PropTypes.number,
  answer: PropTypes.any,
};
