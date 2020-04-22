import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import { Row, Col, Container } from "react-bootstrap";
import { withRouter, Redirect } from "react-router-dom";
import { ADMIN_ACCOUNT } from "utils/constants.js";
import { Button } from "reactstrap";
import "./ConfirmationStyle.scss";
import CardsDisplay from "../../components/CardsDisplay/CardsDisplay";

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
      <div className="Heading">Confirmation</div>
      <div className="FlexContainer">
        <div className="FlexColumn">
          <div className="WordDisplayBar">
            hi
          </div>
        </div>
        <div className="FlexColumn">
          <div className="CardsDisplaySection">
            hi
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
