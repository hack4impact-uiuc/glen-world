import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
import "./CustomLessonsDisplay.css";
import LessonDateDisplay from "../LessonDateDisplay/LessonDateDisplay";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";
import LessonInfoDisplay from "../LessonInfoDisplay/LessonInfoDisplay";

const CustomLessonsDisplay = ({ firebase }) => {
  const [adminLessons, setAdminLessons] = useState([]);
  const [template, setTemplate] = useState(null);
  const [templateMap] = useState({ A: "VOCAB", A3: "WRITING", C: "PHONICS" });
  const [lessonWords, setLessonWords] = useState(null);
  const [students, setStudents] = useState([]);
  const [displayLessonInfo, setDisplayLessonInfo] = useState(false);
  const [changePage, setChangePage] = useState(false);
  const [ADMIN_ACCOUNT] = useState("AxtySwFjYwR0uEsyP3Ds9nO22CY2");

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
    // Get custom lessons made by admin
    firebase.getAdminCustomLessons(ADMIN_ACCOUNT).then(lesson => {
      setAdminLessons(lesson);
    });
  });

  function handleChangeDisplayLessonInfo(display) {
    setDisplayLessonInfo(display);
  }

  function handleClick(lessonTemplate, words, studentIds) {
    handleChangeDisplayLessonInfo(!displayLessonInfo);
    if (lessonTemplate in templateMap) {
      setTemplate(templateMap[lessonTemplate]);
    } else {
      setTemplate(lessonTemplate);
    }
    setLessonWords(words);

    Promise.all(
      studentIds.map(id => {
        return firebase.getDeploymentAccountInformation(id);
      })
    ).then(value => {
      let usernames = value.map(studentInfo => {
        return studentInfo["username"];
      });
      setStudents(usernames);
    });
  }

  function handleAdd() {
    setChangePage(true);
  }

  if (changePage) {
    return <Redirect to="/createlesson" />;
  }

  return (
    <div>
      <div className="Heading">Lesson Plans</div>

      <div>
        <center>
          <button className="Button" onClick={() => handleAdd()}>
            {" "}
            Create Lesson
          </button>
          <button className="Button" onClick={() => orderAdminLessons(true)}>
            {" "}
            Sort by Latest
          </button>
          <button className="Button" onClick={() => orderAdminLessons(false)}>
            {" "}
            Sort by Oldest
          </button>
        </center>
      </div>
      <div className="DateDisplay">
        {adminLessons &&
          adminLessons.map((lesson, index) => (
            <div
              onClick={() =>
                handleClick(
                  lesson.lessonTemplate,
                  lesson.words,
                  lesson.deploymentAccountIds
                )
              }
            >
              <LessonDateDisplay number={index} date={lesson.dueDate} />
            </div>
          ))}
      </div>
      <div>
        {displayLessonInfo && (
          <LessonInfoDisplay
            template={template}
            words={lessonWords}
            studentNames={students}
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
