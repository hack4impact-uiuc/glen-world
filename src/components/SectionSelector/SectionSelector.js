import React from "react";
import { withFirebase } from "utils/Firebase";
import { Button, Box } from "@material-ui/core/";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import useStyles from "SectionSelector/SectionSelectorStyle.js";
import CreateAssignment from "../../pages/CreateAssignment/CreateAssignment";
import { render } from "@testing-library/react";
import StudentList from "../StudentList/StudentList";
function SectionSelector(props) {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.container}>
        <Box alignItems="flex-end">
          <h1 className={classes.header}>LESSON TYPE</h1>
          <Row className={classes.row}>
            <Col>
              <Button
                onClick={props.handlePhonics}
                classes={{
                  root: classes.button_root,
                  label: classes.button_label
                }}
              >
                <Row>
                  <img src="images/icon.svg" alt="phonics" />
                </Row>
                <Row>PHONICS</Row>
              </Button>
            </Col>
            <Col>
              <Button
                onClick={props.handleVocab}
                classes={{
                  root: classes.button_root,
                  label: classes.button_label
                }}
              >
                <Row>
                  <img src="images/icon.svg" alt="words" />
                </Row>
                <Row>WORDS</Row>
              </Button>
            </Col>
            <Col>
              <Button
                onClick={props.handleWriting}
                classes={{
                  root: classes.button_root,
                  label: classes.button_label
                }}
              >
                <Row>
                  <img src="images/icon.svg" alt="phonics" />
                </Row>
                <Row>WRITING</Row>
              </Button>
            </Col>
          </Row>
        </Box>
      </Container>
      {/* {ShowWordsWriting && <CreateAssignment/>}
        {ShowPhonics && <div> hello sumit, how are you doing </div>} */}
    </div>
  );
}
export default withFirebase(SectionSelector);
