import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentList from "components/StudentList/StudentList";
import DatePicker from "components/DatePicker/DatePicker.js";
import WordGroupSelector from "../../components/WordGroupSelector/WordGroupSelector";

const LAM_ADMIN_ACCOUNT = "AxtySwFjYwR0uEsyP3Ds9nO22CY2";

function CreateAssignment({ firebase }) {
  const [words, setWords] = useState([]);
  const [wordGroup, setWordGroup] = useState();
  const [date, setDate] = useState();
  const [deploymentAccountIds, setDeploymentAccountIds] = useState([]);
  const [adminDeployments, setAdminDeployments] = useState([]);
  useEffect(() => {
    firebase
      .getDeploymentAccountsFromAdmin(LAM_ADMIN_ACCOUNT)
      .then(deploymentAccounts => {
        setAdminDeployments(deploymentAccounts);
      });
  }, [firebase]);

  function handleDatePickerChange(value) {
    setDate(value);
  }
  function handleStudentListChange(value) {
    setDeploymentAccountIds(value);
  }
  function handleWordSelectorChange(value) {
    setWords(value);
  }
  function handleWordGroupChange(value) {
    setWordGroup(value);
  }

  const pushLesson = () => {
    firebase.addCustomLesson(
      LAM_ADMIN_ACCOUNT,
      deploymentAccountIds,
      "A2",
      wordGroup,
      words,
      date.date
    );
  };

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
                deployments={adminDeployments}
                handleChange={handleStudentListChange}
              />
            </Col>
            <Col xs={1}></Col>
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

export default compose(withFirebase)(CreateAssignment);
