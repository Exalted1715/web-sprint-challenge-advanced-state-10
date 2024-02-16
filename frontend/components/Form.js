import React from 'react';
import { connect } from 'react-redux';
import { inputChange, resetForm, postQuiz } from '../state/action-creators';

export function Form(props) {
    const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;

    const onChange = (evt) => {
        const { id, value } = evt.target;
        const trimmedValue = id === 'newQuestion' ? value.trimStart() : value;
        props.inputChange(id, trimmedValue); // Dispatch action to update the Redux store
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
        const quizData = {
            newQuestion,
            newTrueAnswer,
            newFalseAnswer
        };
        props.postQuiz(quizData); // Dispatch postQuiz action with quizData
    };

    // Check if all inputs have values more than one character in length after trimming
    const isSubmitDisabled =
        newQuestion.trim().length < 2 || newTrueAnswer.trim().length < 2 || newFalseAnswer.trim().length < 2;

    return (
        <form id="form" onSubmit={onSubmit}>
            <h2>Create New Quiz</h2>
            <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={newQuestion} />
            <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={newTrueAnswer} />
            <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={newFalseAnswer} />
            <button id="submitNewQuizBtn" type="submit" disabled={isSubmitDisabled}>Submit new quiz</button>
        </form>
    );
}

const mapStateToProps = (state) => ({
    form: state.form,
});

const mapDispatchToProps = {
    inputChange,
    resetForm,
    postQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
