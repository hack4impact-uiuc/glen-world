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

  function handleChangeDisplayLessonInfo(display) {
    setDisplayLessonInfo(display);
  }

  function handleClick(lesson) {
    handleChangeDisplayLessonInfo(!displayLessonInfo);
    setDisplayLesson(lesson);
    console.log(lesson);
    if (lesson.lessonTemplate in TEMPLATE_LESSON_MAP) {
      setDisplayTemplate(TEMPLATE_LESSON_MAP[lesson.lessonTemplate]);
    } else {
      setDisplayTemplate(lesson.lessonTemplate);
    }

    // Promise.all(
    //   lesson.deploymentAccountIds.map(id => {
    //     return firebase.getDeploymentAccountInformation(id);
    //   })
    // ).then(value => {
    //   let usernames = value.map(studentInfo => {
    //     return studentInfo["username"];
    //   });
    //   setDisplayStudents(usernames);
    // });
  }

  if (createLessonRedirect) {
    return <Redirect to="/createlesson" />;
  }

  return (
    <div>
      <div className="Heading">Lesson Plans</div>

      <div>
        <center>
          <button
            className="Button"
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
      <div className="NameDisplay">
        {adminLessons &&
          adminLessons.map(lesson => (
            // The below code previously displayed lesson names.
            // Currently commented out due to Firebase endpoint changes

            // <div key={lesson.id} onClick={() => handleClick(lesson)}>
            //   <LessonNameDisplay lessonName={lesson.lessonName} />
            // </div>

            // TODO: Remove the code below this line once the above is fixed
            <div key={lesson.id} onClick={() => handleClick(lesson)}>
              <Col><LessonNameDisplay lessonName={lesson.lessonName} /></Col>
            </div>
          ))}
      </div>
      <div>
        {/* TODO: LessonInfoDisplay will require overhaul. */}
        {displayLessonInfo && displayLesson && (
          <LessonInfoDisplay
            lesson={displayLesson}
            template={displayLessonTemplate}
            words={displayLesson.words}
            studentNames={displayLessonStudents}
            setDisplay={handleChangeDisplayLessonInfo}
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
