import React from "react";
import "./InvalidAssignment.scss";

function InvalidAssignment(props) {
  function handleClose() {
    props.setMessage([]);
  }

  function displayMessage(message) {
    return <div className="Message">{message}</div>;
  }

  return (
    <div className="InvalidAssignment">
      <div className="MessageArea">{props.message.map(displayMessage)}</div>
      <div className="CloseMessage" onClick={() => handleClose()}>
        Close
      </div>
    </div>
  );
}

export default InvalidAssignment;
