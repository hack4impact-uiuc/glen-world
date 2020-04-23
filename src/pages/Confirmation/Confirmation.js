import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import { Row, Col, Container } from "react-bootstrap";
import { withRouter, Redirect } from "react-router-dom";
import { ADMIN_ACCOUNT } from "utils/constants.js";
import { Button } from "reactstrap";
import "./ConfirmationStyle.scss";
import CardsDisplay from "../../components/CardsDisplay/CardsDisplay";
import ConfirmationCard from "../../components/ConfirmationCard/ConfirmationCard";

function Confirmation(props) {
  const { firebase } = props;
  const lesson = props?.location.state;
  const words = lesson.selectedWords;
  const deploymentAccountIds = lesson.deploymentIds;
  const lessonType = lesson.lesson;
  const wordGroup = lesson.group;
  const dates = lesson.dueDates;
  const lessonCards = lesson.cards;
  const allDeployments = lesson.deployments;
  const lessonName = lesson.lessonNameValue;
  const existingId = lesson.id;
  const [submitted, setSubmitted] = useState(false);
  const [editRedirect, setEditRedirect] = useState(false);
  const [handlePhonics, setPhonics] = useState(false);
  const [handleWords, setWords] = useState(false);
  const [handleVocab, setVocab] = useState(false);

  useEffect(() => {
    if (lessonType === "A") setVocab(true);
    else if (lessonType === "C") setPhonics(true);
    else if (lessonType === "A3") setWords(true);
  });

  function pushLesson() {
    firebase.setCustomLesson(
      ADMIN_ACCOUNT,
      deploymentAccountIds,
      lessonType,
      wordGroup,
      words,
      dates,
      lessonName,
      existingId
    );
    setSubmitted(true);
  }

  if (submitted) {
    return <Redirect to="/" />;
  }

  if (editRedirect) {
    return (
      <Redirect
        to={{
          pathname: "/createlesson",
          state: {
            existingAssignment: {
              deploymentAccountIds: deploymentAccountIds,
              words: words,
              lessonTemplate: lessonType,
              wordGroup: wordGroup,
              dueDates: dates,
              lessonName: lessonName,
              id: existingId,
              confirm: {
                redirect: true
              }
            }
          }
        }}
      />
    );
  }

  return (
    <div>
      <div className="FlexContainer">
        <div className="WordDisplayBar">
          {handlePhonics && (
            <div className="LessonTypeDisplayIcon">
              <img src="images/lesson-group/phonics.svg" alt="phonics" />
              PHONICS
            </div>
          )}
          {handleVocab && (
            <div className="LessonTypeDisplayIcon">
              <img src="images/lesson-group/words.svg" alt="words" />
              VOCAB
            </div>
          )}
          {handleWords && (
            <div className="LessonTypeDisplayIcon">
              <img src="images/lesson-group/writing.svg" alt="writing" />
              WRITING
            </div>
          )}
          <div>
            <ConfirmationCard
              lessonDate={"WORDS"}
              lessonStudents={words}
              confirmation={true}
            />
          </div>
        </div>

        <div className="CardsDisplaySection">
          <div className="LessonNameDisplayHeader">{lessonName}</div>
          <CardsDisplay cards={lessonCards} />
          <div className="FlexContainer">
            <Button
              onClick={() => setEditRedirect(true)}
              className="EditButtonConfirmPage"
            >
              Edit
            </Button>
            <Button onClick={pushLesson} className="ConfirmButtonConfirmPage">
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default compose(
  withFirebase,
  withRouter
)(Confirmation);
