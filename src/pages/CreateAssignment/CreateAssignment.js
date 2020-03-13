import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentList from "components/StudentList/StudentList";
import DatePicker from "components/DatePicker/DatePicker.js";
import WordGroupSelector from "../../components/WordGroupSelector/WordGroupSelector";

const LAM_ADMIN_ACCOUNT = "AxtySwFjYwR0uEsyP3Ds9nO22CY2";

function CreateAssignment({ firebase, existingAssignment }) {
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

    if (existingAssignment) prePopulateAssignment(existingAssignment);
  }, [firebase]);

  function prePopulateAssignment(existingAssignment) {
    handleDatePickerChange(existingAssignment.dueDate);
    handleStudentListChange(existingAssignment.deploymentAccountIds);
    handleWordSelectorChange(existingAssignment.words);
    handleWordGroupChange(existingAssignment.wordGroup);
  }

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
    firebase.setCustomLesson(
      LAM_ADMIN_ACCOUNT,
      deploymentAccountIds,
      "A2",
      wordGroup,
      words,
      date,
      existingAssignment?.id
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
                assignedStudents={existingAssignment?.deploymentAccountIds}
              />
            </Col>
            <Col>
              <DatePicker
                handleChange={handleDatePickerChange}
                assignedDate={existingAssignment?.dueDate}
              />
            </Col>
          </Row>
        </Container>

        <Button onClick={() => pushLesson()}>Assign Lesson</Button>
      </div>
    </div>
  );
}

export default compose(withFirebase)(CreateAssignment);
