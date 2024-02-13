import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  return (
    <div id="wrapper">
      <div id="wheel">
        <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}>C</div>
        <div className="cog" style={{ "--i": 2 }}>D</div>
        <div className="cog" style={{ "--i": 3 }}>E</div>
        <div className="cog" style={{ "--i": 4 }}>F</div>
        <div className="cog" style={{ "--i": 5 }}>G</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
      <button onClick={() => {
          console.log('Move Counter Clockwise Clicked');
          props.moveCounterClockwise();
        }} id="counterClockwiseBtn">Counter clockwise</button>
        <button onClick={() => {
          console.log('Move Clockwise Clicked');
          props.moveClockwise();
        }} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wheel: state.wheel
});

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);