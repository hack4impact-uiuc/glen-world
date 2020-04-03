import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateAssignment.scss";
import { Container, Row, Col } from "react-bootstrap";
import { compose } from "recompose";
import { Button } from "reactstrap";
import { ADMIN_ACCOUNT } from "utils/constants.js";
import { withFirebase } from "utils/Firebase";
import StudentList from "components/StudentList/StudentList";
import DatePicker from "components/DatePicker/DatePicker.js";
import WordGroupSelector from "../../components/WordGroupSelector/WordGroupSelector";
import SectionSelector from "../../components/SectionSelector/SectionSelector";
import InvalidAssignment from "../../components/InvalidAssignment/InvalidAssignment";

function CreateAssignment({ firebase }) {
  const [submitted, setSubmitted] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [showWriting, setShowWriting] = useState(false);
  const [showPhonics, setShowPhonics] = useState(false);
  const [lessonType, setLessonType] = useState();
  const [words, setWords] = useState([]);
  const [wordGroup, setWordGroup] = useState();
  const [date, setDate] = useState();
  const [deploymentAccountIds, setDeploymentAccountIds] = useState([]);
  const [adminDeployments, setAdminDeployments] = useState([]);
  // Message that displays when an assignment hasn't been created properly
  const [invalidMessage, setInvalidMessage] = useState([]);

  useEffect(() => {
    firebase
      .getDeploymentAccountsFromAdmin(ADMIN_ACCOUNT)
      .then(deploymentAccounts => {
        setAdminDeployments(deploymentAccounts);
      });
  }, [firebase]);

  function handleDatePickerChange(value) {
    setDate(value);
  }
  function handleStudentListChange(value) {
    setDeploymentAccountIds(value);
  }
  function handleWordSelectorChange(value) {
    setWords(value);
  }
  function handleWordGroupChange(value) {
    setWordGroup(value);
  }
  function handleVocab() {
    setLessonType("A");
    setShowVocab(true);
    setShowPhonics(false);
    setShowWriting(false);
  }
  function handlePhonics() {
    setLessonType("C");
    setShowVocab(false);
    setShowPhonics(true);
    setShowWriting(false);
  }
  function handleWriting() {
    setLessonType("A3");
    setShowVocab(false);
    setShowPhonics(false);
    setShowWriting(true);
  }
  function validateAssignment() {
    var validAssignment = true;
    // TODO: Add validation for Phonics based on pending requirements
    if (lessonType != "C" && (wordGroup == null || words.length < 4)) {
      setInvalidMessage(invalidMessage => [
        ...invalidMessage,
        "Please include at least 4 words."
      ]);
      validAssignment = false;
    }
    if (deploymentAccountIds < 1) {
      setInvalidMessage(invalidMessage => [
        ...invalidMessage,
        "Please assign to at least one student."
      ]);
      validAssignment = false;
    }
    if (date == null) {
      setInvalidMessage(invalidMessage => [
        ...invalidMessage,
        "Please select a date on the calendar."
      ]);
      validAssignment = false;
    }
    if (validAssignment) {
      pushLesson();
    }
  }

  const pushLesson = () => {
    firebase.addCustomLesson(
      ADMIN_ACCOUNT,
      deploymentAccountIds,
      lessonType,
      wordGroup,
      words,
      date.date
    );
    setSubmitted(true);
  };

  if (submitted) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <SectionSelector
        handlePhonics={handlePhonics}
        handleVocab={handleVocab}
        handleWriting={handleWriting}
      />
      {(showWriting || showVocab || showPhonics) && (
        <div>
          <div className="assignment_creation">
            <h1>Create Assignment</h1>
            {(showWriting || showVocab) && (
              <WordGroupSelector
                handleChange={handleWordSelectorChange}
                wordGroupChange={handleWordGroupChange}
              />
            )}
            <br />
            <div className="spacing"></div>
            <div className="place_middle">
              <Container>
                <Row>
                  <Col>
                    <StudentList
                      deployments={adminDeployments}
                      handleChange={handleStudentListChange}
                    />
                  </Col>
                  <Col xs={1}></Col>
                  <Col>
                    <DatePicker handleChange={handleDatePickerChange} />
                  </Col>
                </Row>
              </Container>
            </div>
            <Button onClick={validateAssignment} className="assign">
              Assign Lesson
            </Button>
          </div>
          <div>
            {invalidMessage.length > 0 && (
              <InvalidAssignment
                message={invalidMessage}
                setMessage={setInvalidMessage}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default compose(
  withFirebase,
  withRouter
)(CreateAssignment);
