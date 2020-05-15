import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";
import { useRef } from "react";
import useOutsideClick from "../WordSelector/useOutsideClick";
import "./LessonInfoDisplay.scss";

function LessonInfoDisplay(props) {
  const [editLessonRedirect, setEditLessonRedirect] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => {
    props.setDisplay(false);
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
              <div className="student-name">{props.nameMap[id]}</div>
            ))}
          </div>
        </div>
      </Col>
    );
  }

  if (editLessonRedirect) {
    return (
      <Redirect
        to={{
          pathname: "/createlesson",
          state: { existingAssignment: props.lesson }
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
                <div className="lesson-group-name">{props.template}</div>
              </div>
              <div className="lesson-info-word-display">
                <div className="grey-box">
                  <div className="word-group-name">
                    {props.lesson.wordGroup}
                  </div>
                </div>
                <div className="words-list">
                  {props.lesson.words.map(word => (
                    <div className="words">{word}</div>
                  ))}
                </div>
              </div>
            </div>

            <Col className="wide-column">
              <div
                onClick={() => setEditLessonRedirect(true)}
                className="button-container"
              >
                <img src="images/icons/edit-icon.svg" alt="edit" />
              </div>
              <div className="card-container">
                <Row>
                  {Object.keys(props.lesson.dueDates).map(key => (
                    <div>{LessonCard(key, props.lesson.dueDates[key])}</div>
                  ))}
                </Row>
              </div>
            </Col>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default compose(withRouter)(LessonInfoDisplay);
