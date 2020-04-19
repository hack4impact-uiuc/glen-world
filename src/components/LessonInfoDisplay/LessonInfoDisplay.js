import React, { useState } from "react";
import {Col, Row} from "reactstrap";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";
import "./LessonInfoDisplay.scss";

function LessonInfoDisplay(props) {
  const [editLessonRedirect, setEditLessonRedirect] = useState(false);

  function handleClose() {
    props.setDisplay(false);
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
    <div className="LessonInfo">
      <Row>
      <div className="InfoDisplay">
        <Col>
        <div className="Column">
          <div className="WordGroupDisplay">
          <div className="LessonGroupName">{props.template}</div>
          </div>
          <div className = "WordDisplay">
            <div className = "GreyBox">
              <div className = "WordGroupName"> {props.lesson.wordGroup} </div>
            </div>
            <div>
              {props.lesson.words.map((word) => (
                <div className = "Word">{word}</div>

              ))}
            </div>
          </div>
        </div>
        </Col>
        <div>
          {console.log(props.lesson.dueDates)}
        </div>
        {/* <div className="Column">
          <div className="LessonDataTitle">WORDS</div>
          <div className="LessonData">
            {props.words.map((word, index) => (
              <div key={index}>{word}</div>
            ))}
          </div>
        </div> */}
        {/* <div className="Column">
          <div className="LessonDataTitle">STUDENTS</div>
          <div className="LessonData">
            {props.studentNames.map((name, index) => (
              <div key={index}>{name}</div>
            ))}
          </div>
        </div> */}
      </div> 
      </Row>
      <Row>
        <Col>
        
        </Col>
        <Col>
        HOEEEEES
        </Col>
      <Col>
      <div className="ButtonContainer">
        <button onClick={handleClose} className="LessonButton">
          Close
        </button>
        <button
          onClick={() => setEditLessonRedirect(true)}
          className="LessonButton"
        >
          Edit
        </button>
      </div>
      </Col>
      </Row>
  </div>
  );
}

export default compose(withRouter)(LessonInfoDisplay);
