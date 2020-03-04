import React, { useState } from "react";
import CalendarComponent from "../DatePicker/DatePicker";
import { Container, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "../DatePicker/DatePicker";
function AssignmentPage() {
  const [Date, setDate] = useState();
  function handleDatePickerChange(value) {
    setDate(value);
  }
  return (
    <div
      className = "place_middle"
    >
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
  );
}

export default compose(withFirebase)(AssignmentPage);