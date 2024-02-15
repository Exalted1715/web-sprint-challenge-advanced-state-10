import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  return (
    <div id="wrapper">
      <div id="wheel">
        {props.wheel.cogs.map((cog, index) => (
          <div key={index} className={`cog ${cog.active ? 'active' : ''}`} style={{ "--i": index }}>{cog.active && cog.value}</div>
        ))}
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