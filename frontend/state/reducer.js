import { combineReducers } from 'redux';
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from './action-types';

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
  const activeIndex = cogs.findIndex(cog => cog.active);
  const nextIndex = (activeIndex + 1) % cogs.length;
  const updatedCogs = cogs.map((cog, index) => ({
    ...cog,
    active: index === nextIndex
  }));
  return updatedCogs;
}

// Helper function to rotate cogs counterclockwise
function rotateCogsCounterClockwise(cogs) {
  const activeIndex = cogs.findIndex(cog => cog.active);
  const prevIndex = (activeIndex - 1 + cogs.length) % cogs.length;
  const updatedCogs = cogs.map((cog, index) => ({
    ...cog,
    active: index === prevIndex
  }));
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
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
