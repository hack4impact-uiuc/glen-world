import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentList from "components/StudentList/StudentList";
import DatePicker from "components/DatePicker/DatePicker.js";
import getDeploymentAccountsFromAdmin from "utils/Firebase/firebase.js";

const LAM_ADMIN_ACCOUNT = "AxtySwFjYwR0uEsyP3Ds9nO22CY2";

function AssignmentPage({ firebase }) {
  const [Date, setDate] = useState();
  const [DeploymentAccounts, setDeploymentAccounts] = useState([]);
  const [AdminDeployments, setAdminDeployments] = useState([]);
  useEffect(() => {
    firebase
      .getDeploymentAccountsFromAdmin(LAM_ADMIN_ACCOUNT)
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

  const pushLesson = () => {
    let adminAccountId = LAM_ADMIN_ACCOUNT;
    let accounts = DeploymentAccounts;
    let deploymentAccountIds = [];
    var account;
    for (account of accounts) {
      deploymentAccountIds.push(account.deploymentId);
    }
    deploymentAccountIds.shift();

    let lessonTemplate = "A2";
    let wordGroup = "furniture";
    let words = ["couch", "chair", "television"];
    let dueDate = Date;
    console.log(accounts);
    firebase.addCustomLesson(
      adminAccountId,
      deploymentAccountIds,
      lessonTemplate,
      wordGroup,
      words,
      dueDate
    );
  };

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

      <button onClick={() => pushLesson()}>Assign Lesson</button>
    </div>
  );
}

export default compose(withFirebase)(AssignmentPage);
