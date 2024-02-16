import React from 'react';
import { connect } from 'react-redux';


function Message(props) {
  console.log('Message:', props.infoMessage)
  return <div id="message">{props.infoMessage}</div>;
}

const mapStateToProps = (state) => ({
  infoMessage: state.infoMessage,
});


export default connect(mapStateToProps)(Message);
