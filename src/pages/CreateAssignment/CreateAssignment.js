import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateAssignment.scss";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { compose } from "recompose";
import { Button } from "reactstrap";
import { ADMIN_ACCOUNT } from "utils/constants.js";
import { withFirebase } from "utils/Firebase";
import StudentList from "components/StudentList/StudentList";
import DatePicker from "components/DatePicker/DatePicker.js";
import WordGroupSelector from "../../components/WordGroupSelector/WordGroupSelector";
import SectionSelector from "../../components/SectionSelector/SectionSelector";
import PhonicSelector from "../../components/PhonicSelector/PhonicSelector";
import InvalidAssignment from "../../components/InvalidAssignment/InvalidAssignment";
import LessonCardsDisplay from "../../components/LessonCardsDisplay/LessonCardsDisplay";

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
  // A lesson "card" contains a group of students that have been assigned a due date for the current lesson.
  const [lessonCards, setLessonCards] = useState({});
  const [lessonCreationDate, setLessonCreationDate] = useState();

  useEffect(() => {
    firebase
      .getDeploymentAccountsFromAdmin(ADMIN_ACCOUNT)
      .then(deploymentAccounts => {
        setAdminDeployments(deploymentAccounts);
      });

    if (existingAssignment) prePopulateAssignment(existingAssignment);
    let originalDate = new Date();
    // Set time on current date to 0 to allow for edge case where teacher wants to include today in lesson dates.
    originalDate.setHours(0, 0, 0, 0);
    setLessonCreationDate(originalDate);
  }, [firebase]);

  function prePopulateAssignment(existingAssignment) {
    handleDatePickerChange(existingAssignment.dueDate.toDate());
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
  function createLessonCard() {
    var validCard = true;
    if (deploymentAccountIds < 1) {
      setInvalidMessage(invalidMessage => [
        ...invalidMessage,
        "Please assign to at least one student."
      ]);
      validCard = false;
    }
    if (date == null) {
      setInvalidMessage(invalidMessage => [
        ...invalidMessage,
        "Please select a date on the calendar."
      ]);
      validCard = false;
    } else if (date in lessonCards) {
      setInvalidMessage(invalidMessage => [
        ...invalidMessage,
        "Cannot have duplicate dates in the same lesson."
      ]);
      validCard = false;
    } else if (date.getTime() < lessonCreationDate.getTime()) {
      setInvalidMessage(invalidMessage => [
        ...invalidMessage,
        "Cannot select a date before the current date."
      ]);
      validCard = false;
    }
    if (validCard) {
      Promise.all(
        deploymentAccountIds.map(id => {
          return firebase.getDeploymentAccountInformation(id);
        })
      ).then(value => {
        let usernames = value.map(studentInfo => {
          return studentInfo["username"];
        });
        setLessonCards({
          ...lessonCards,
          [date]: [deploymentAccountIds, usernames]
        });
      });
    }
  }
  function deleteLessonCard(cardDate) {
    const tempCards = { ...lessonCards };
    delete tempCards[cardDate];
    setLessonCards(tempCards);
  }

  function verifyNameAndPush() {
    var options = { month: "long" };
    let month = new Intl.DateTimeFormat("en-US", options).format(
      lessonCreationDate
    );
    let day = lessonCreationDate.getDate();
    let year = lessonCreationDate.getFullYear();
    let defaultName = `${wordGroup}: ${month} ${day} ${year}`;

    if (!lessonName) {
      // set default name if no lesson name
      setLessonName(defaultName);

      // react sets state asynchronously so lessonName doesn't actually update until rerender
      pushLesson(defaultName);
    } else {
      pushLesson(lessonName);
    }
  }
  function validateAssignment() {
    var validAssignment = true;
    if (wordGroup == null || (words.length < 4 && lessonType != "C")) {
      setInvalidMessage(invalidMessage => [
        ...invalidMessage,
        "Please include at least 4 words."
      ]);
      validAssignment = false;
    }
    if (lessonCards.length < 1) {
      setInvalidMessage(invalidMessage => [
        ...invalidMessage,
        "Please assign students to due dates on the Calendar by clicking the Create Button."
      ]);
      validAssignment = false;
    }
    if (validAssignment) {
      verifyNameAndPush();
    }
  }
  const pushLesson = lessonNameValue => {
    var dates = {};
    const lessonKeys = Object.keys(lessonCards);
    for (const key of lessonKeys) {
      dates[key] = lessonCards[key][0];
    }

    firebase.setCustomLesson(
      ADMIN_ACCOUNT,
      deploymentAccountIds,
      lessonType,
      wordGroup,
      words,
      dates,
      lessonNameValue,
      existingAssignment?.id
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { redirect: true }
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
          <div>
            <InputGroup className="name-assignment">
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
          </div>
          {showPhonics && (
            <PhonicSelector
              handlePhonicsChange={handleWordSelectorChange}
              handleGroupChange={handleWordGroupChange}
            />
          )}
          {(showWriting || showVocab) && (
            <WordGroupSelector
              handleChange={handleWordSelectorChange}
              wordGroupChange={handleWordGroupChange}
              assignedWords={words || existingAssignment?.words}
              assignedWordGroup={wordGroup || existingAssignment?.wordGroup}
            />
          )}
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
          <div>
            <LessonCardsDisplay
              cards={lessonCards}
              addCard={createLessonCard}
              removeCard={deleteLessonCard}
            />
          </div>
          <div>
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
