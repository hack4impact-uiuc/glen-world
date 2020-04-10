import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateAssignment.scss";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { compose } from "recompose";
import { Button, Input } from "reactstrap";
import { ADMIN_ACCOUNT } from "utils/constants.js";
import { withFirebase } from "utils/Firebase";
import StudentList from "components/StudentList/StudentList";
import DatePicker from "components/DatePicker/DatePicker.js";
import WordGroupSelector from "../../components/WordGroupSelector/WordGroupSelector";
import SectionSelector from "../../components/SectionSelector/SectionSelector";
import InvalidAssignment from "../../components/InvalidAssignment/InvalidAssignment";

function CreateAssignment(props) {
  const { firebase } = props;
  const { existingAssignment } = props?.location.state || {};
  const [lessonName, setLessonName] = useState();
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

    if (existingAssignment) {
      if(!existingAssignment.confirm?.redirect)
        existingAssignment.dueDate = existingAssignment.dueDate.toDate()
      console.log(existingAssignment);
      prePopulateAssignment(existingAssignment);
    }
  }, [firebase]);

  function prePopulateAssignment(existingAssignment) {
    handleDatePickerChange(existingAssignment.dueDate);
    handleStudentListChange(existingAssignment.deploymentAccountIds);
    handleWordSelectorChange(existingAssignment.words);
    handleWordGroupChange(existingAssignment.wordGroup);
    handleLessonNameChange(existingAssignment.lessonName);
    handleSectionSelection(existingAssignment.lessonTemplate);
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
  function handleSectionSelection(value) {
    if (value === "A") handleVocab();
    else if (value === "C") handlePhonics();
    else if (value === "A3") handleWriting();
  }

  function handleLessonNameChange(value) {
    setLessonName(value);
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
  function verifyNameAndPush() {
    var options = { month: "long" };
    let month = new Intl.DateTimeFormat("en-US", options).format(date);
    let day = date.getDate();
    let year = date.getFullYear();
    let defaultName = `${wordGroup}: ${month} ${day} ${year}`;

    if (!lessonName) {
      // set default name if no lesson name
      setLessonName(defaultName);
      setSubmitted(true);
      // react sets state asynchronously so lessonName doesn't actually update until rerender
      //pushLesson(defaultName);
    } else {
      setLessonName(lessonName);
      setSubmitted(true);
    }
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
      verifyNameAndPush();
    }
  }

  if (submitted) {
    return (
      <Redirect
        to={{
          pathname: "/confirmation",
          state: {
            deploymentIds: deploymentAccountIds,
            selectedWords: words,
            lesson: lessonType,
            group: wordGroup,
            dueDate: date,
            deployments: adminDeployments,
            lessonNameValue: lessonName,
            id: existingAssignment?.id
          }
          /*
          pathname: "/",
          state: { redirect: true }
          */
        }}
      />
    );
  }

  return (
    <>
      <SectionSelector
        default={[!showPhonics, !showVocab, !showWriting]}
        handlePhonics={handlePhonics}
        handleVocab={handleVocab}
        handleWriting={handleWriting}
      />
      {(showWriting || showVocab || showPhonics) && (
        <div>
          <h1>Create Assignment</h1>
          <br />
          {(showWriting || showVocab) && (
            <WordGroupSelector
              handleChange={handleWordSelectorChange}
              wordGroupChange={handleWordGroupChange}
              assignedWords={words || existingAssignment?.words}
              assignedWordGroup={wordGroup || existingAssignment?.wordGroup}
            />
          )}
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
          <Row>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="input-header">
                    Lesson Name
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  className="input"
                  placeholder={"Ex. Vocab"}
                  defaultValue={lessonName || ""}
                  onChange={e => handleLessonNameChange(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col>
              <Button onClick={validateAssignment} className="assign">
                Assign Lesson
              </Button>
            </Col>
          </Row>
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
