import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";
import { withFirebase } from "utils/Firebase";
import { useRef } from "react";
import useOutsideClick from "../WordSelector/useOutsideClick";
import "./LessonInfoDisplay.scss";
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation";

function LessonInfoDisplay(props) {
  const {
    firebase,
    lesson,
    template,
    setDisplay,
    handleDeletedLesson,
    nameMap
  } = props;
  const [editLessonRedirect, setEditLessonRedirect] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => {
    if (!showDelete) {
      setDisplay(false);
    }
  });

  function toFormatDate(date) {
    let dateComponents = date.split(" ");
    return (
      dateComponents[1] + " " + dateComponents[2] + ", " + dateComponents[3]
    );
  }

  function LessonCard(date, students) {
    return (
      <Col>
        <div className="student-date-card">
          <div className="purple-box">
            <div className="date-label">{toFormatDate(date)}</div>
          </div>
          <div className="student-container">
            {students.map(id => (
              <div className="student-name">{nameMap[id]}</div>
            ))}
          </div>
        </div>
      </Col>
    );
  }

  function handleDeleteLesson() {
    firebase.deleteCustomLesson(lesson.id, lesson.dueDates);
    handleDeletedLesson();
    setShowDelete(false);
    setDisplay(false);
  }

  if (editLessonRedirect) {
    return (
      <Redirect
        to={{
          pathname: "/createlesson",
          state: { existingAssignment: lesson }
        }}
      />
    );
  }

  return (
    <div className="lesson-info">
      <div ref={ref}>
        <Row>
          <div className="info-display">
            <div className="column">
              <div className="word-group-display">
                <div className="lesson-group-name">{template}</div>
              </div>
              <div className="lesson-info-word-display">
                <div className="grey-box">
                  <div className="word-group-name">{lesson.wordGroup}</div>
                </div>
                <div className="words-list">
                  {lesson.words.map(word => (
                    <div className="words">{word}</div>
                  ))}
                </div>
              </div>
            </div>

            <Col className="wide-column">
              <div className="lesson-info-button-bar">
                <div
                  onClick={() => setEditLessonRedirect(true)}
                  className="button-container"
                >
                  <img src="images/icons/edit-icon.svg" alt="edit" />
                </div>
                <div
                  onClick={() => setShowDelete(true)}
                  className="button-container"
                >
                  <img src="images/icons/delete-icon.svg" alt="delete" />
                </div>
              </div>
              <div className="card-container">
                <Row>
                  {Object.keys(lesson.dueDates).map(key => (
                    <div>{LessonCard(key, lesson.dueDates[key])}</div>
                  ))}
                </Row>
              </div>
            </Col>
          </div>
        </Row>
      </div>
      {showDelete && (
        <DeleteConfirmation
          lessonName={lesson.lessonName}
          handleDelete={handleDeleteLesson}
          handleClose={setShowDelete}
        />
      )}
    </div>
  );
}

export default compose(
  withFirebase,
  withRouter
)(LessonInfoDisplay);
