import React from "react";
import "./DeleteConfirmation.scss";

function DeleteConfirmation(props) {
  const { lessonName, handleDelete, handleClose } = props;
  return (
    <div className="confirmation-background">
      <div className="delete-note">Delete Lesson: {lessonName}?</div>
      <div className="delete-lesson-button-container">
        <div className="delete-confirmation-button" onClick={handleDelete}>
          YES
        </div>
        <div
          className="delete-confirmation-button"
          onClick={() => handleClose(false)}
        >
          NO
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
