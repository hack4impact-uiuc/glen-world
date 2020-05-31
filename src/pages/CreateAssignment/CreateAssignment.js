import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateAssignment.scss";
import { InputGroup, FormControl } from "react-bootstrap";
import { compose } from "recompose";
import { Button } from "reactstrap";
import { getDeploymentAccountIdsFromLesson } from "utils/Lesson";
import { ADMIN_ACCOUNT } from "utils/constants.js";
import { withFirebase } from "utils/Firebase";
import StudentSelector from "components/StudentSelector/StudentSelector";
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
  const [returnHome, setReturnHome] = useState(false);

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

  async function parseCardsFromLesson(lesson) {
    let deploymentAccountIds = getDeploymentAccountIdsFromLesson(lesson);

    let deploymentNameMap = {};
    Promise.all(
      deploymentAccountIds.map(id => {
        return firebase.getDeploymentAccountInformation(id);
      })
    )
      .then(deploymentAccounts => {
        for (let i = 0; i < deploymentAccounts.length; i++) {
          deploymentNameMap[deploymentAccountIds[i]] =
            deploymentAccounts[i].username;
        }

        let lessonCards = {};
        for (let [dueDate, assignedDeploymentIds] of Object.entries(
          lesson.dueDates
        )) {
          let lessonCard = [[], []];
          assignedDeploymentIds.forEach(deploymentAccountId => {
            lessonCard[0].push(deploymentAccountId); // inputting account id
            lessonCard[1].push(deploymentNameMap[deploymentAccountId]); // input corresponding username
          });

          lessonCards[dueDate] = lessonCard;
        }
        setLessonCards(lessonCards);
      })
      .catch(error => console.error("Error getting custom lesson: ", error));
  }

  function prePopulateAssignment(existingAssignment) {
    parseCardsFromLesson(existingAssignment);
    setWords(existingAssignment.words);
    setWordGroup(existingAssignment.wordGroup);
    setLessonName(existingAssignment.lessonName);
    handleSectionSelection(existingAssignment.lessonTemplate);
  }

  function handleSectionSelection(value) {
    if (value === "A") handleVocab();
    else if (value === "C") handlePhonics();
    else if (value === "A3") handleWriting();
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
    let validCard = true;
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
    let options = { month: "long" };
    let month = new Intl.DateTimeFormat("en-US", options).format(
      lessonCreationDate
    );
    let day = lessonCreationDate.getDate();
    let year = lessonCreationDate.getFullYear();
    let defaultName = `${wordGroup}: ${month} ${day} ${year}`;

    if (!lessonName) {
      // set default name if no lesson name
      setLessonName(defaultName);
      setSubmitted(true);
      // react sets state asynchronously so lessonName doesn't actually update until rerender
    } else {
      setLessonName(lessonName);
      setSubmitted(true);
    }
  }
  function validateAssignment() {
    let validAssignment = true;
    if (wordGroup == null || (words.length < 4 && lessonType !== "C")) {
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

  if (returnHome) {
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    );
  }

  if (submitted) {
    let dates = {};
    const lessonKeys = Object.keys(lessonCards);
    for (const key of lessonKeys) {
      dates[key] = lessonCards[key][0];
    }

    return (
      <Redirect
        to={{
          pathname: "/confirmation",
          state: {
            selectedWords: words,
            lesson: lessonType,
            group: wordGroup,
            dueDates: dates,
            deployments: adminDeployments,
            lessonNameValue: lessonName,
            cards: lessonCards,
            id: existingAssignment?.id
          }
        }}
      />
    );
  }

  return (
      <div className="create-assignment">
        <div className="header-route-back">
          <img
            src="images/icons/back-icon.svg"
            onClick={() => setReturnHome(true)}
            alt="back-icon"
          />
          &ensp;&ensp;&ensp;
          <h1 className="header" onClick={() => setReturnHome(true)}>
            LESSON TYPE
          </h1>
        </div>
        <br />
        <SectionSelector
          default={[!showPhonics, !showVocab, !showWriting]}
          handlePhonics={handlePhonics}
          handleVocab={handleVocab}
          handleWriting={handleWriting}
        />
        <br />
        {(showWriting || showVocab || showPhonics) && (
          <div>
            <br />
            <div>
              {showPhonics && (
                <div>
                  <h1 className="header">PHONICS</h1>
                  <PhonicSelector
                    handlePhonicsChange={setWords}
                    handleGroupChange={setWordGroup}
                    words={words}
                  />
                </div>
              )}
              {(showWriting || showVocab) && (
                <div>
                  {(showWriting && <h1 className="header">WRITING</h1>) || (
                    <h1 className="header">WORDS</h1>
                  )}
                  <WordGroupSelector
                    handleChange={setWords}
                    wordGroupChange={setWordGroup}
                    assignedWords={words || existingAssignment?.words}
                    assignedWordGroup={
                      wordGroup || existingAssignment?.wordGroup
                    }
                  />
                </div>
              )}
            </div>
            {(showWriting || showVocab) && (
              <div>
                {(showWriting && <h1 className="header">WRITING</h1>) || (
                  <h1 className="header">WORDS</h1>
                )}
                <WordGroupSelector
                  selectedWordGroup={wordGroup}
                  selectWords={setWords}
                  selectWordGroup={setWordGroup}
                  assignedWords={words || existingAssignment?.words}
                  assignedWordGroup={wordGroup || existingAssignment?.wordGroup}
                />
              </div>
            )}
            <div className="lesson-name">
              <InputGroup className="name-assignment">
                <InputGroup.Prepend>
                  <InputGroup.Text className="input-header">
                    Lesson Name
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  className="input"
                  maxLength="40"
                  placeholder={"Ex. Vocab"}
                  defaultValue={lessonName || ""}
                  onChange={e => setLessonName(e.target.value)}
                />
              </InputGroup>
              </div>
          <div className="student-date-container">
            <StudentSelector
              deployments={adminDeployments}
              handleChange={setDeploymentAccountIds}
              assignedStudents={existingAssignment?.deploymentAccountIds}
            ></StudentSelector>
            <DatePicker
              handleChange={setDate}
              assignedDate={existingAssignment?.dueDate}
            />
          </div>
          <div>
            <LessonCardsDisplay
              cards={lessonCards}
              addCard={createLessonCard}
              removeCard={deleteLessonCard}
            />
          </div>
          <Button onClick={validateAssignment} className="assign">
            Assign Lesson
          </Button>
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
    </div>
  );
}
export default compose(
  withFirebase,
  withRouter
)(CreateAssignment);
