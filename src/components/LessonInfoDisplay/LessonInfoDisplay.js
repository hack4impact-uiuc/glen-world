import React, { useState } from "react";
import {Col, Row} from "reactstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";
import "./LessonInfoDisplay.scss";

const LessonInfoDisplay = props => {
  const { firebase } = props;
  const [editLessonRedirect, setEditLessonRedirect] = useState(false);
  const [names, setNames] = useState([])

  function handleClose() {
    props.setDisplay(false);
  }

  function toFormatDate(date) {
    let dateComponents = date
      .split(" ");
      return dateComponents[1] + " " + dateComponents[2] + ", " + dateComponents[3];
  }
  function getUsernames(students) {
    Promise.all(
      students.map(id => {
        return firebase.getDeploymentAccountInformation(id);
      })
    ).then(value => {
      let usernames = value.map(studentInfo => {
        return studentInfo["username"];
      });
      setNames(usernames)
    }
    )
    return names;
  }

  function LessonCard(date, students) {
    return (
      <Col>
      <div className = "StudentDateCard">
      <div className = "PurpleBox">
        <div className = "DateLabel">{toFormatDate(date)}</div>
      </div>
      <div className = "StudentContainer">
        {
          getUsernames(students)
        }
      </div>
      </div>
      </Col>
    )
  }
  // Promise.all(
    //   lesson.deploymentAccountIds.map(id => {
    //     return firebase.getDeploymentAccountInformation(id);
    //   })
    // ).then(value => {
    //   let usernames = value.map(studentInfo => {
    //     return studentInfo["username"];
    //   });
    //   setDisplayStudents(usernames);
    // });

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
            <div className = "WordsList">
              {props.lesson.words.map((word) => (
                <div className = "Word">{word}</div>

              ))}
            </div>
          </div>
        </div>
        </Col>

        <Col>
        <div className = "CardContainer">
        <Row>
          {Object.keys(props.lesson.dueDates).map(key => (
            // <div> {key} </div>
            //map the deployments below
          // <div> {props.lesson.dueDates[key]}</div>
          <div>
            {LessonCard(key, props.lesson.dueDates[key])}
            {/* {props.lesson.dueDates[key]} */}
          </div>
          ))}
        </Row>
        </div>
        </Col>
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
      {/* <Row>
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
      </Row> */}
  </div>
  );
}

export default compose(withFirebase, withRouter)(LessonInfoDisplay);

