// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from './action-types'
import {connect} from 'react-redux'

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
        cogs: state.cogs.map((cog, index) => ({
          ...cog,
          active: index === (state.cogs.length - 1) ? true : false // Set only the last cog as active
        }))
      };
    case MOVE_COUNTERCLOCKWISE:
      return {
        ...state,
        cogs: state.cogs.map((cog, index) => ({
          ...cog,
          active: index === 0 ? true : false // Set only the first cog as active
        }))
      };
    default:
      return state;
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
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
