import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";
import { ADMIN_ACCOUNT } from "utils/constants.js";
import { Button } from "reactstrap";
import "./ConfirmationStyle.scss";
import CardsDisplay from "../../components/CardsDisplay/CardsDisplay";
import ConfirmationCard from "../../components/ConfirmationCard/ConfirmationCard";

function Confirmation(props) {
  const { firebase } = props;
  const lesson = props?.location.state;
  const [submitted, setSubmitted] = useState(false);
  const [editRedirect, setEditRedirect] = useState(false);
  const [handlePhonics, setPhonics] = useState(false);
  const [handleWords, setWords] = useState(false);
  const [handleVocab, setVocab] = useState(false);
  const [needRowSpace, setNeedRowSpace] = useState(false);

  useEffect(() => {
    if (lesson.lesson === "A") setVocab(true);
    else if (lesson.lesson === "C") setPhonics(true);
    else if (lesson.lesson === "A3") setWords(true);

    if (Object.keys(lesson.cards).length <= 3) setNeedRowSpace(true);
  }, [lesson.lesson, lesson.cards]);

  function pushLesson() {
    firebase.setCustomLesson(
      ADMIN_ACCOUNT,
      lesson.lesson,
      lesson.group,
      lesson.selectedWords,
      lesson.dueDates,
      lesson.lessonNameValue,
      lesson.id
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
              deploymentAccountIds: lesson.deploymentAccountIds,
              words: lesson.selectedWords,
              lessonTemplate: lesson.lesson,
              wordGroup: lesson.group,
              dueDates: lesson.dueDates,
              lessonName: lesson.lessonNameValue,
              id: lesson.id
            }
          }
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex-container">
        <div className="word-display-bar">
          {handlePhonics && (
            <div className="lesson-type-display-icon">
              <img src="images/lesson-group/phonics.svg" alt="phonics" />
              PHONICS
            </div>
          )}
          {handleVocab && (
            <div className="lesson-type-display-icon">
              <img src="images/lesson-group/words.svg" alt="words" />
              VOCAB
            </div>
          )}
          {handleWords && (
            <div className="lesson-type-display-icon">
              <img src="images/lesson-group/writing.svg" alt="writing" />
              WRITING
            </div>
          )}
          {(handleVocab || handleWords) && (
            <div>
              <ConfirmationCard
                title={"WORDS"}
                lessonStudents={lesson.selectedWords}
                confirmation={true}
              />
            </div>
          )}
          {handlePhonics && (
            <div>
              <ConfirmationCard
                title={"WORD GROUPS"}
                lessonStudents={lesson.selectedWords}
                confirmation={true}
              />
            </div>
          )}
        </div>

        <div className="cards-display-section">
          <div className="lesson-name-display-header">
            {lesson.lessonNameValue}
          </div>
          <CardsDisplay cards={lesson.cards} />
          {needRowSpace && <div className="cards-rowspace-placeholder"></div>}
          <Button
            onClick={() => setEditRedirect(true)}
            className="edit-button-confirm-page"
          >
            Edit
          </Button>
          <Button onClick={pushLesson} className="confirm-button-confirm-page">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default compose(
  withFirebase,
  withRouter
)(Confirmation);
