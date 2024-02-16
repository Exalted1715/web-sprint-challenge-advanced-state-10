import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, setSelectedAnswer, postAnswer } from '../state/action-creators';

function Quiz(props) {
  useEffect(() => {
    props.fetchQuiz();
  }, []);

  function handleSubmitAnswer() {
    const { quiz, selectedAnswer } = props;
  
    if (selectedAnswer && quiz && quiz.quiz_id) {
      props.postAnswer(quiz.quiz_id, selectedAnswer)
        .then(response => {
          if (response.data.correct === false) { // adjust this based on your server response
            // If the answer is incorrect, dispatch the setInfoMessage action with the failure message
            props.setInfoMessage('Your answer is incorrect. Please try again.');
          }
        });
    } else {
      console.error('Selected answer or quiz ID is missing.');
    }
  }

  const handleSelectAnswer = (answerId) => {
    props.setSelectedAnswer(answerId);
  };

  // Check if a selected answer exists
  const isAnswerSelected = props.selectedAnswer !== null;

  return (
    <div id="wrapper">
      <h2>{props.quiz.question}</h2>
      <div id="quizAnswers">
        {props.quiz.answers &&
          props.quiz.answers.map((answer, index) => (
            <div
              className={`answer ${
                props.selectedAnswer === answer.answer_id ? 'selected' : ''
              }`}
              key={index}
            >
              {answer.text}
              <button onClick={() => handleSelectAnswer(answer.answer_id)}>
                {props.selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
              </button>
            </div>
          ))}
      </div>
      {/* Disable the button if no answer is selected */}
      <button
        id="submitAnswerBtn"
        onClick={handleSubmitAnswer}
        disabled={!isAnswerSelected}
      >
        Submit answer
      </button>
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
  postAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
