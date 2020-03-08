import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentList from "components/StudentList/StudentList";
import DatePicker from "components/DatePicker/DatePicker.js";
import WordGroupSelector from "../../components/GroupSelector/WordGroupSelector";

const LAM_ADMIN_ACCOUNT = "AxtySwFjYwR0uEsyP3Ds9nO22CY2";

function AssignmentPage({ firebase }) {
  const [Words, setWords] = useState([]);
  const [WordGroup, setWordGroup] = useState();
  const [Date_, setDate] = useState();
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

  function handleWordSelectorChange(value) {
    setWords(value);
  }
  function handleWordGroupChange(value) {
    setWordGroup(value);
  }

  const pushLesson = () => {
    let adminAccountId = LAM_ADMIN_ACCOUNT;
    let deploymentAccountIds = DeploymentAccounts;
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
  };

  return (
    <div>
      <WordGroupSelector
        handleChange={handleWordSelectorChange}
        wordGroupChange={handleWordGroupChange}
      />
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
    </div>
  );
}

export default compose(withFirebase)(AssignmentPage);
