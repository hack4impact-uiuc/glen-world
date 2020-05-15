import React from "react";
import "./InvalidAssignment.scss";

function InvalidAssignment(props) {
  function handleClose() {
    props.setMessage([]);
  }

  function displayMessage(message) {
    return <div className="message">{message}</div>;
  }

  return (
    <div className="invalid-assignment">
      <div className="message-area">{props.message.map(displayMessage)}</div>
      <div className="close-message" onClick={handleClose}>
        Close
      </div>
    </div>
  );
}

export default InvalidAssignment;
