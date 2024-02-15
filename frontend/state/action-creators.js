import axios from 'axios';
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
  FETCH_QUIZ_SUCCESS,
  POST_ANSWER_SUCCESS,
  POST_QUIZ_SUCCESS,
  SET_ERROR_MESSAGE
} from './action-types';

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function setQuizIntoState(quizData) {
  return { type: SET_QUIZ_INTO_STATE, payload: quizData };
}

export function setSelectedAnswer(answer) {
  return { type: SET_SELECTED_ANSWER, payload: answer };
}

export function setInfoMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function inputChange(fieldName, value) {
  return { type: INPUT_CHANGE, payload: { fieldName, value } };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setInfoMessage('Loading next quiz...'));
    axios.get('http://localhost:9000/api/quiz/next')
      .then(response => {
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: response.data }); // Dispatch SET_QUIZ_INTO_STATE
        dispatch({ type: FETCH_QUIZ_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: SET_ERROR_MESSAGE, payload: 'Failed to fetch quiz.' });
        console.error('Failed to fetch quiz:', error);
      });
  };
}



export function postAnswer(quizId, answerId) {
  const answerData = {
    quiz_id: quizId,
    answer_id: answerId
  };

  return function(dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', answerData)
      .then(response => {
        dispatch({ type: POST_ANSWER_SUCCESS });
        dispatch(setInfoMessage(response.data.message));
        dispatch(fetchQuiz()); // Assuming you want to fetch the next quiz after submitting the answer
      })
      .catch(error => {
        dispatch({ type: SET_ERROR_MESSAGE, payload: 'Failed to post answer.' });
        console.error('Failed to post answer:', error);
      });
  };
}
export function postQuiz() {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', quizData)
      .then(response => {
        dispatch({ type: POST_QUIZ_SUCCESS });
        dispatch(setInfoMessage(response.data.message));
        dispatch(resetForm());
      })
      .catch(error => {
        dispatch({ type: SET_ERROR_MESSAGE, payload: 'Failed to post quiz.' });
        console.error('Failed to post quiz:', error);
      });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
