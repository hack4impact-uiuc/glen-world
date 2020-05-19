import React from "react";
import "./DeleteConfirmation.scss";

function DeleteConfirmation(props) {
  return (
    <div className="confirmation-background">
      <div className="delete-note">Delete Lesson: {props.lessonName}?</div>
      <div className="delete-lesson-button-container">
        <div
          className="delete-confirmation-button"
          onClick={() => props.handleDelete()}
        >
          YES
        </div>
        <div
          className="delete-confirmation-button"
          onClick={() => props.handleClose(false)}
        >
          NO
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
