import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, setSelectedAnswer, postAnswer } from '../state/action-creators'; // Import postAnswer action creator

function Quiz(props) {
  useEffect(() => {
    props.fetchQuiz();
  }, []);

  const handleSubmitAnswer = () => {
    const { quiz, selectedAnswer } = props;

    if (selectedAnswer && quiz && quiz.quiz_id) {
      props.postAnswer(quiz.quiz_id, selectedAnswer);
    } else {
      console.error('Selected answer or quiz ID is missing.');
    }
  };

  const [buttonText, setButtonText] = useState('Select');

  const handleSelectAnswer = (answerId) => {
    props.setSelectedAnswer(answerId);
    setButtonText('Selected');
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
                {props.selectedAnswer === answer.answer_id ? 'Selected' : 'Select'}
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
  postAnswer, // Add postAnswer to mapDispatchToProps
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
