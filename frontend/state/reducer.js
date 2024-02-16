import { combineReducers } from 'redux';
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, 
  SET_SELECTED_ANSWER, INPUT_CHANGE, SET_INFO_MESSAGE, SET_ERROR_MESSAGE, FETCH_QUIZ_SUCCESS, RESET_FORM, POST_QUIZ_SUCCESS } from './action-types';

const initialWheelState = {
  cogs: [
    { value: 'B', active: true },
    { value: 'C', active: false },
    { value: 'D', active: false },
    { value: 'E', active: false },
    { value: 'F', active: false },
    { value: 'G', active: false }
  ]
};

function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return {
        ...state,
        cogs: rotateCogsClockwise(state.cogs)
      };
    case MOVE_COUNTERCLOCKWISE:
      return {
        ...state,
        cogs: rotateCogsCounterClockwise(state.cogs)
      };
    default:
      return state;
  }
}

function rotateCogsClockwise(cogs) {
  const updatedCogs = [...cogs]; 

  // Rotate the cogs clockwise
  const lastCog = updatedCogs.pop(); 
  updatedCogs.unshift(lastCog)

  // Update the 'active' property based on the position of 'B'
  const bIndex = updatedCogs.findIndex(cog => cog.value === 'B');
  updatedCogs.forEach((cog, index) => {
    cog.active = index === bIndex;
  });

  return updatedCogs;
}

function rotateCogsCounterClockwise(cogs) {
  const updatedCogs = [...cogs]; // Create a copy of the cogs array

  // Rotate the cogs counterclockwise
  const firstCog = updatedCogs.shift(); // Remove the first cog
  updatedCogs.push(firstCog); // Add it to the end

  // Update the 'active' property based on the position of 'B'
  const bIndex = updatedCogs.findIndex(cog => cog.value === 'B');
  updatedCogs.forEach((cog, index) => {
    cog.active = index === bIndex;
  });

  return updatedCogs;
}

const initialQuizState = {
  question: '',
  answers: [],
};

function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return action.payload; // Store the selected answer ID
    default:
      return state;
  }
}

const initialMessageState = ''

function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
    case SET_ERROR_MESSAGE:
      return action.payload;
    case FETCH_QUIZ_SUCCESS:
      return null; // Reset the message after successfully fetching a quiz
    default:
      return state;
  }
}


const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
};

function form(state = initialFormState, action) {
  switch (action.type) {
      case INPUT_CHANGE:
          return {
              ...state,
              [action.payload.fieldName]: action.payload.value,
          };
      case RESET_FORM:
          return initialFormState; // Reset form state to initial state
      case POST_QUIZ_SUCCESS:
          return initialFormState; // Reset form state after successfully posting quiz
      default:
          return state;
  }
}
export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
