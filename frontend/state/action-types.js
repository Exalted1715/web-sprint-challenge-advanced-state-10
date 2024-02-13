// ❗ You don't need to add extra action types to achieve MVP
import react from "react"
import {connect} from 'react-redux'

export const MOVE_CLOCKWISE = 'MOVE_CLOCKWISE'
export const MOVE_COUNTERCLOCKWISE = 'MOVE_COUNTERCLOCKWISE'
export const SET_QUIZ_INTO_STATE = 'SET_QUIZ_INTO_STATE'
export const SET_SELECTED_ANSWER = 'SET_SELECTED_ANSWER'
export const SET_INFO_MESSAGE = 'SET_INFO_MESSAGE'
export const INPUT_CHANGE = 'INPUT_CHANGE'
export const RESET_FORM = 'RESET_FORM'
export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCESS';
export const POST_ANSWER_SUCCESS = 'POST_ANSWER_SUCCESS';
export const POST_QUIZ_SUCCESS = 'POST_QUIZ_SUCCESS';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';