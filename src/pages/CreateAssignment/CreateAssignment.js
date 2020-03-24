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
  useEffect(() => {
    firebase.getDeploymentAccountsFromAdmin(ADMIN_ACCOUNT).then(deploymentAccounts => {
      setAdminDeployments(deploymentAccounts);
    });

    if (existingAssignment) prePopulateAssignment(existingAssignment);
  }, [firebase]);

  function prePopulateAssignment(existingAssignment) {
    handleDatePickerChange(existingAssignment.dueDate);
    handleStudentListChange(existingAssignment.deploymentAccountIds);
    handleWordSelectorChange(existingAssignment.words);
    handleWordGroupChange(existingAssignment.wordGroup);
  }

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

  const pushLesson = () => {
    firebase.setCustomLesson(
      LAM_ADMIN_ACCOUNT,
      deploymentAccountIds,
      lessonType,
      wordGroup,
      words,
      date,
      existingAssignment?.id
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
                    assignedStudents={existingAssignment?.deploymentAccountIds}
                  />
                </Col>
                <Col xs={1}></Col>
                <Col>
                  <DatePicker
                    handleChange={handleDatePickerChange}
                    assignedDate={existingAssignment?.dueDate}
                  />
                </Col>
              </Row>
            </Container>
          </div>
          <Button onClick={() => pushLesson()} className="assign">
            Assign Lesson
          </Button>
        </div>
      )}
    </>
  );
}

export default compose(
  withFirebase,
  withRouter
)(CreateAssignment);
