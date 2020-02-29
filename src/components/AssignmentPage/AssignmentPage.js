import React, { useState } from "react";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import { Container, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
function AssignmentPage() {
  const [Date, setDate] = useState();
  function handleCalendarChange(value) {
    setDate(value);
  }
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <Container>
        <Row>
          <Col>
            <div>Insert Student List component</div>
          </Col>
          <Col>
            <CalendarComponent handleChange={handleCalendarChange} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default compose(withFirebase)(AssignmentPage);
