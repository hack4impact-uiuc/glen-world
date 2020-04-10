import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import { Row, Col, Container } from "react-bootstrap";
import { withRouter, Redirect } from "react-router-dom";
import { ADMIN_ACCOUNT } from "utils/constants.js";
import { Button } from "reactstrap";
import {
  Checkbox,
  ListItemIcon,
  Collapse,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import useStyles from "./ConfirmationStyle.js";

function Confirmation(props) {
  const { firebase } = props;
  const lesson = props?.location.state;
  const words = lesson.selectedWords;
  const deploymentAccountIds = lesson.deploymentIds;
  const lessonType = lesson.lesson;
  const wordGroup = lesson.group;
  const date = lesson.dueDate;
  const allDeployments = lesson.deployments;
  const lessonName = lesson.lessonNameValue;
  const existingId = lesson.id;
  const [submitted, setSubmitted] = useState(false);
  const [editRedirect, setEditRedirect] = useState(false);
  const classes = useStyles();

  function pushLesson() {
    firebase.setCustomLesson(
      ADMIN_ACCOUNT,
      deploymentAccountIds,
      lessonType,
      wordGroup,
      words,
      date,
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
              dueDate: date,
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
      <Container>
        <Row>
          <Col xl="auto">
            <Row className={classes.row}>
              <Row>
                <img src="images/icon.svg" alt="vocab" />
              </Row>
              <Row>VOCAB</Row>
            </Row>
            <Row>
              <List>
                <ListItem className={classes.listSection}>Words</ListItem>
                {words.map(word => (
                  <ListItem className={classes.nested}>
                    <ListItemText primary={`${word}`} />
                  </ListItem>
                ))}
              </List>
            </Row>
          </Col>
          <Col xl={20}></Col>
          {lessonName}
        </Row>
      </Container>
      <Button onClick={() => setEditRedirect(true)} className="assign">
        Edit
      </Button>
      <Button onClick={pushLesson} className="assign">
        Confirm
      </Button>
    </div>
  );
}

export default compose(
  withFirebase,
  withRouter
)(Confirmation);
