import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, setSelectedAnswer, } from '../state/action-creators';

function Quiz(props) {
  useEffect(() => {
    props.fetchQuiz();
  }, []);

  return (
    <div id="wrapper">
      <h2>{props.quiz.question}</h2>
      <div id="quizAnswers">
        {props.quiz.answers &&
          props.quiz.answers.map((answer, index) => (
            <div className={`answer ${props.selectedAnswer === answer ? 'selected' : ''}`} key={index}>
              {answer}
              <button onClick={() => props.setSelectedAnswer(answer)}>Select</button>
            </div>
          ))}
      </div>
      <button id="submitAnswerBtn">Submit answer</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz,
  selectedAnswer: state.selectedAnswer,
});

const mapDispatchToProps = {
  fetchQuiz,
  setSelectedAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
