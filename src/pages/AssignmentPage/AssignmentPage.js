import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "../../components/DatePicker/DatePicker";
import WordGroupSelector from "../../components/GroupSelector/WordGroupSelector";

function AssignmentPage() {
  const [Words, setWords] = useState([]);
  const [Date, setDate] = useState();
  function handleWordSelectorChange(value) {
    setWords(value);
  }
  function handleDatePickerChange(value) {
    setDate(value);
  }
  return (
    <div>
      <WordGroupSelector handleChange={handleWordSelectorChange} />
      <div className="place_middle">
        <Container>
          <Row>
            <Col>
              <div>Insert Student List component</div>
            </Col>
            <Col>
              <DatePicker handleChange={handleDatePickerChange} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default compose(withFirebase)(AssignmentPage);
