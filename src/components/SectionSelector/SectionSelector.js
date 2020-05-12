import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
import { Button, Box } from "@material-ui/core/";
import { Row, Col, Container } from "react-bootstrap";
import useStyles from "SectionSelector/SectionSelectorStyle.js";
function SectionSelector(props) {
  const classes = useStyles();
  const [button, setButton] = useState(props.default);
  const propFunctions = [
    props.handlePhonics,
    props.handleVocab,
    props.handleWriting
  ];

  useEffect(() => {
    setButton(props.default);
  }, [props.default]);

  const handleClick = index => {
    let buttonCopy = [true, true, true];
    buttonCopy[index] = !buttonCopy[index];
    setButton(buttonCopy);
    propFunctions[index]();
  };
  return (
    <Container>
      <Box>
        <Row>
          <Col>
            <Button
              onClick={() => handleClick(0)}
              classes={{
                root: button[0] ? classes.button_root : classes.button_selected,
                label: classes.button_label
              }}
            >
              <Row>
                <img src="images/lesson-group/phonics.svg" alt="phonics" />
              </Row>
              <Row>PHONICS</Row>
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => handleClick(1)}
              classes={{
                root: button[1] ? classes.button_root : classes.button_selected,
                label: classes.button_label
              }}
            >
              <Row>
                <img src="images/lesson-group/words.svg" alt="words" />
              </Row>
              <Row>WORDS</Row>
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => handleClick(2)}
              classes={{
                root: button[2] ? classes.button_root : classes.button_selected,
                label: classes.button_label
              }}
            >
              <Row>
                <img src="images/lesson-group/writing.svg" alt="writing" />
              </Row>
              <Row>WRITING</Row>
            </Button>
          </Col>
        </Row>
      </Box>
    </Container>
  );
}
export default withFirebase(SectionSelector);
