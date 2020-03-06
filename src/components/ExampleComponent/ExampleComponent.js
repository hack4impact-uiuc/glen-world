import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";

// Example constants
const LAM_ADMIN_ACCOUNT = "AxtySwFjYwR0uEsyP3Ds9nO22CY2";
const LAM_STUDENT_ACCOUNT = "Oar8wZRQ0JArkRU1VfBj";
const FATIMA_STUDENT_ACCOUNT = "S1ewuj5tOwC7z6EGTP3e";

/**
 * Example of how to get customLessons given an adminID
 */
const ExampleComponent = ({ firebase }) => {
  const [adminLessons, setAdminLessons] = useState(null);
  const [studentLessons, setStudentLessons] = useState(null);
  const [lastMasteredLesson, setLastMasteredLesson] = useState(null);
  const [deployments, setDeployments] = useState(null);

  useEffect(() => {
    // Get student accounts
    firebase.getDeploymentAccountsFromAdmin(LAM_ADMIN_ACCOUNT).then(deploymentAccounts => {
      setDeployments(deploymentAccounts);
    });

    // Get custom lessons made by admin
    firebase.getAdminCustomLessons(LAM_ADMIN_ACCOUNT).then(lessons => {
      setAdminLessons(lessons);
    });

    // Get custom lessons for student
    firebase.getDeploymentAccountCustomLessons(LAM_STUDENT_ACCOUNT).then(lessons => {
      setStudentLessons(lessons);
    });

    // Get last mastered lesson
    firebase.getLastMasteredLesson(LAM_STUDENT_ACCOUNT).then(lesson => {
      setLastMasteredLesson(lesson);
    });
  }, []);

  const pushCustomLesson = () => {
    let adminAccountId = LAM_ADMIN_ACCOUNT;
    let deploymentAccountIds = [LAM_STUDENT_ACCOUNT, FATIMA_STUDENT_ACCOUNT];
    let lessonTemplate = "A2";
    let wordGroup = "furniture";
    let words = ["couch", "chair", "television"];
    let dueDate = new Date();

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
      <div> Example Component </div>
      <br></br>
      <div> Deployments </div>
      {deployments &&
        deployments.map((deployment, index) => (
          <div>
            <div style={{ fontWeight: 600 }}>
              Class {index} ({deployment.deploymentId}) students:
            </div>
            <ol>
              {Array.isArray(deployment.deploymentAccounts) &&
                deployment.deploymentAccounts.map(student => <li> {student.username} </li>)}
            </ol>
          </div>
        ))}

      <div> Lam's (admin) assigned custom lesson wordgroups: </div>
      {adminLessons && adminLessons.map(lesson => <div> {lesson.wordGroup} </div>)}
      <br></br>

      <div> Lam's (student) assigned custom lesson wordgroups: </div>
      {studentLessons && studentLessons.map(lesson => <div> {lesson.wordGroup} </div>)}
      <br></br>

      <div> Lam's (student) last mastered lesson: </div>
      <div> {lastMasteredLesson}</div>
      <br></br>

      <button onClick={() => pushCustomLesson()}>Push custom lesson</button>
    </div>
  );
};

export default withFirebase(ExampleComponent);
