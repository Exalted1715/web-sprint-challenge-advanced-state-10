import React from 'react';
import { connect } from 'react-redux';
import { inputChange, resetForm, postQuiz } from '../state/action-creators';

export function Form(props) {
  const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;

  const onChange = (evt) => {
    const { id, value } = evt.target;
    props.inputChange(id, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.postQuiz({ question: newQuestion, trueAnswer: newTrueAnswer, falseAnswer: newFalseAnswer });
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={newFalseAnswer} />
      <button id="submitNewQuizBtn" type="submit">Submit new quiz</button>
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