import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
import { TEMPLATE_LESSON_MAP, ADMIN_ACCOUNT } from "utils/constants.js";
import "./CustomLessonsDisplay.scss";
import { compose } from "recompose";
import {Col, Row} from "reactstrap";
import { withRouter, Redirect, useHistory } from "react-router-dom";
import LessonDateDisplay from "../../components/LessonDateDisplay/LessonDateDisplay";
import LessonInfoDisplay from "../../components/LessonInfoDisplay/LessonInfoDisplay";
import LessonNameDisplay from "../../components/LessonNameDisplay/LessonNameDisplay";

const CustomLessonsDisplay = props => {
  const { firebase } = props;
  const [adminLessons, setAdminLessons] = useState([]);
  const [displayLesson, setDisplayLesson] = useState(null);
  const [displayLessonTemplate, setDisplayTemplate] = useState(null);
  const [displayLessonStudents, setDisplayStudents] = useState([]);
  const [displayLessonInfo, setDisplayLessonInfo] = useState(false);
  const [createLessonRedirect, setCreateLessonRedirect] = useState(false);
  const[nameMap, setNameMap] = useState({});
  const editLessonRedirect = props?.location.state?.redirect;

  function orderAdminLessons(reverse) {
    const sortedLessons = [...adminLessons].sort((a, b) => {
      if (reverse) {
        return b.dueDate["seconds"] - a.dueDate["seconds"];
      } else {
        return a.dueDate["seconds"] - b.dueDate["seconds"];
      }
    });
    setAdminLessons(sortedLessons);
  }

  useEffect(() => {
    setTimeout(() => {
      // TODO: figure out better solution to resolve this
      // Get custom lessons made by admin
      firebase.getAdminCustomLessons(ADMIN_ACCOUNT).then(lesson => {
        setAdminLessons(lesson);
      });
    }, 50); // Timeout for firebase to update and display updated lessons properly
  }, [editLessonRedirect]); // Updates lessons when redirected to page from CreateAssignment

  //taken from lam
  async function deploymentNameMap(lesson) {
    let deploymentAccountIds = new Set();
    for (const dueDate in lesson.dueDates) {
      for (const deploymentAccount of lesson.dueDates[dueDate]) {
        deploymentAccountIds.add(deploymentAccount);
      }
    }

    let deploymentNameMap = {};
    Array.from(deploymentAccountIds).forEach(id => {
      firebase
        .getDeploymentAccountInformation(id)
        .then(deploymentAccount => {
          deploymentNameMap[id] = deploymentAccount.username;
        })
        .catch(error => console.error("Error getting custom lesson: ", error));
    });

    //Wait for deploymentNameMap to finish resolving
    while (Object.keys(deploymentNameMap).length == 0) {
      await new Promise(r => setTimeout(r, 500));
    }
    setNameMap(deploymentNameMap)
    
  }

  function handleChangeDisplayLessonInfo(display) {
    setDisplayLessonInfo(display);
  }

  function handleClick(lesson) {
    handleChangeDisplayLessonInfo(!displayLessonInfo);
    setDisplayLesson(lesson);
    deploymentNameMap(lesson);
    if (lesson.lessonTemplate in TEMPLATE_LESSON_MAP) {
      setDisplayTemplate(TEMPLATE_LESSON_MAP[lesson.lessonTemplate]);
    } else {
      setDisplayTemplate(lesson.lessonTemplate);
    }
  }

  if (createLessonRedirect) {
    return <Redirect to="/createlesson" />;
  }

  return (
    <div>
      <div className="heading">Lesson Plans</div>

      <div>
        <center>
          <button
            className="button"
            onClick={() => setCreateLessonRedirect(true)}
          >
            Create Lesson
          </button>
          {/* The below code was previously used to sort lessons by date. 
          Currently causes API error, but might not be used as lessons can now be named. */}
          {/* <button className="Button" onClick={() => orderAdminLessons(true)}>
            Sort by Latest
          </button>
          <button className="Button" onClick={() => orderAdminLessons(false)}>
            Sort by Oldest
          </button> */}
        </center>
      </div>
      <div className="name-display">
        {adminLessons &&
          adminLessons.map(lesson => (
            <div key={lesson.id} onClick={() => handleClick(lesson)}>
              <Col><LessonNameDisplay lessonName={lesson.lessonName} /></Col>
            </div>
          ))}
      </div>
      <div>
        {displayLessonInfo && displayLesson && (
          <LessonInfoDisplay
            lesson={displayLesson}
            template={displayLessonTemplate}
            setDisplay={handleChangeDisplayLessonInfo}
            nameMap = {nameMap}
          />
        )} 
      </div>
    </div>
  );
};

export default compose(
  withFirebase,
  withRouter
)(CustomLessonsDisplay);
