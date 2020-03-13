import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentList from "components/StudentList/StudentList";
import DatePicker from "components/DatePicker/DatePicker.js";
import WordGroupSelector from "../../components/WordGroupSelector/WordGroupSelector";
import SectionSelector from "../../components/SectionSelector/SectionSelector";

const LAM_ADMIN_ACCOUNT = "AxtySwFjYwR0uEsyP3Ds9nO22CY2";

function CreateAssignment({ firebase }) {
  const [ShowVocab, setShowVocab] = useState(false);
  const [ShowWriting, setShowWriting] = useState(false);
  const [ShowPhonics, setShowPhonics] = useState(false);
  const [lessonType, setLessonType] = useState();
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
  function handleVocab() {
    setLessonType("A");
    setShowVocab(true);
    setShowPhonics(false);
    setShowWriting(false);
  }
  function handlePhonics() {
    setLessonType("C");
    setShowVocab(false);
    setShowPhonics(true);
    setShowWriting(false);
  }
  function handleWriting() {
    setLessonType("A3");
    setShowVocab(false);
    setShowPhonics(false);
    setShowWriting(true);
  }

  const pushLesson = () => {
    firebase.addCustomLesson(
      LAM_ADMIN_ACCOUNT,
      deploymentAccountIds,
      lessonType,
      wordGroup,
      words,
      date.date
    );
  };

  return (
    <div>
      <SectionSelector
        handlePhonics={handlePhonics}
        handleVocab={handleVocab}
        handleWriting={handleWriting}
      />
      {(ShowWriting || ShowVocab) && (
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
                <Col>
                  <DatePicker handleChange={handleDatePickerChange} />
                </Col>
              </Row>
            </Container>

            <Button onClick={() => pushLesson()}>Assign Lesson</Button>
          </div>
        </div>
      )}
      {ShowPhonics && <div> hi sumit, how are you today </div>}
    </div>
  );
}

export default compose(withFirebase)(CreateAssignment);
