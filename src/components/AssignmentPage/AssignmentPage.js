import React, { useState, useEffect } from "react";
import CalendarComponent from "../DatePicker/DatePicker";
import { Container, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "../DatePicker/DatePicker";
import StudentList from "../StudentList/StudentList";
import getDeploymentAccountsFromAdmin from "utils/Firebase/firebase.js";
function AssignmentPage({ firebase }) {
  const [Date, setDate] = useState();
  const [DeploymentAccounts, setDeploymentAccounts] = useState([]);
  const [AdminDeployments, setAdminDeployments] = useState([]);

  useEffect(() => {
    firebase
      .getDeploymentAccountsFromAdmin("q9SKXnmXunTooHg9yokcB9vKiZt2")
      .then(deploymentAccounts => {
        setAdminDeployments(deploymentAccounts);
      });
  }, []);

  function handleDatePickerChange(value) {
    setDate(value);
  }
  function handleDeploymentAccounts(value) {
    setDeploymentAccounts(value);
  }
  console.log(Date);
  console.log(DeploymentAccounts);
  return (
    <div className="place_middle">
      <Container>
        <Row>
          <h1>this is the assignment page yall</h1>
        </Row>
        <Row>
          <Col>
            <StudentList
              deployments={AdminDeployments}
              handleChange={handleDeploymentAccounts}
            />
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
