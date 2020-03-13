import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentList from "components/StudentList/StudentList";
import DatePicker from "components/DatePicker/DatePicker.js";
import WordGroupSelector from "../../components/GroupSelector/WordGroupSelector";
import { withRouter, Redirect } from "react-router-dom";

const LAM_ADMIN_ACCOUNT = "AxtySwFjYwR0uEsyP3Ds9nO22CY2";

function AssignmentPage({ firebase }) {
  const [Words, setWords] = useState([]);
  const [WordGroup, setWordGroup] = useState();
  const [Date_, setDate] = useState();
  const [DeploymentAccountIds, setDeploymentAccountIds] = useState([]);
  const [AdminDeployments, setAdminDeployments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
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
    setDeploymentAccountIds(value);
  }
  function handleWordSelectorChange(value) {
    setWords(value);
  }
  function handleWordGroupChange(value) {
    setWordGroup(value);
  }

  const pushLesson = () => {
    let adminAccountId = LAM_ADMIN_ACCOUNT;
    let deploymentAccountIds = DeploymentAccountIds;
    let lessonTemplate = "A2";
    let wordGroup = WordGroup;
    let words = Words;
    let dueDate = Date_.date;

    firebase.addCustomLesson(
      adminAccountId,
      deploymentAccountIds,
      lessonTemplate,
      wordGroup,
      words,
      dueDate
    );
    setSubmitted(true);
  };

  if (submitted) return <Redirect to="/" />;

  return (
    <div>
      <h1>Create Assignment</h1>
      <WordGroupSelector
        handleChange={handleWordSelectorChange}
        wordGroupChange={handleWordGroupChange}
      />
      <br />
      <div className="place_middle">
        <Container>
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
    </div>
  );
}

export default compose(
  withFirebase,
  withRouter
)(AssignmentPage);