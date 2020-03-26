import React from "react";
import "./InvalidAssignment.scss";

function InvalidAssignment(props) {
  function handleClose() {
    props.setValid(true);
    props.setMessage("");
  }

  return (
    <div className="InvalidAssignment">
      <div className="Message">{props.message}</div>
      <div className="CloseMessage" onClick={() => handleClose()}>
        Close
      </div>
    </div>
  );
}

export default InvalidAssignment;
