import React from "react";
import { withFirebase } from "utils/Firebase";
import { Button, Box, ButtonGroup } from "@material-ui/core/";
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
  const [button, setButton] = React.useState([true, true, true]);
  const propFunctions = [
    props.handlePhonics,
    props.handleVocab,
    props.handleWriting
  ];

  const handleClick = index => {
    let buttonCopy = [true, true, true];
    buttonCopy[index] = !buttonCopy[index];
    setButton(buttonCopy);
    propFunctions[index]();
  };
  return (
    <div>
      <Container className={classes.container}>
        <Box alignItems="flex-end">
          <h1 className={classes.header}>LESSON TYPE</h1>
          <Row className={classes.row}>
            <ButtonGroup>
              <Col>
                <Button
                  onClick={() => handleClick(0)}
                  classes={{
                    root: button[0]
                      ? classes.button_root
                      : classes.button_selected,
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
                  onClick={() => handleClick(1)}
                  classes={{
                    root: button[1]
                      ? classes.button_root
                      : classes.button_selected,
                    label: classes.button_label
                  }}
                >
                  <Row>
                    <img src="images/icon.svg" alt="vocab" />
                  </Row>
                  <Row>VOCAB</Row>
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={() => handleClick(2)}
                  classes={{
                    root: button[2]
                      ? classes.button_root
                      : classes.button_selected,
                    label: classes.button_label
                  }}
                >
                  <Row>
                    <img src="images/icon.svg" alt="phonics" />
                  </Row>
                  <Row>WRITING</Row>
                </Button>
              </Col>
            </ButtonGroup>
          </Row>
        </Box>
      </Container>
      {/* {ShowWordsWriting && <CreateAssignment/>}
        {ShowPhonics && <div> hello sumit, how are you doing </div>} */}
    </div>
  );
}
export default withFirebase(SectionSelector);
