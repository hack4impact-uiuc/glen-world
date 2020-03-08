import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
import "./TeacherLessonsDisplay.css";
import LessonDateDisplay from "../LessonDateDisplay/LessonDateDisplay";
import LessonInfoDisplay from "../LessonInfoDisplay/LessonInfoDisplay";

const TeacherLessonsDisplay = ({ firebase }) => {
  const [adminLessons, setAdminLessons] = useState(null);
  const [lessonWordGroup, setLessonWordGroup] = useState(null);
  const [lessonWords, setLessonWords] = useState(null);
  const [students, setStudents] = useState(null);
  const [displayLessonInfo, setDisplayLessonInfo] = useState(false);
  const [ADMIN_ACCOUNT] = useState("AxtySwFjYwR0uEsyP3Ds9nO22CY2");

  useEffect(() => {
    // Get custom lessons made by admin
    firebase.getAdminCustomLessons(ADMIN_ACCOUNT).then(lesson => {
      setAdminLessons(lesson);
    });
  }, []);

  function handleChangeDisplayLessonInfo(display) {
    setDisplayLessonInfo(display);
  }

  function handleClick(wordGroup, words, studentIds) {
    handleChangeDisplayLessonInfo(!displayLessonInfo);
    setLessonWordGroup(wordGroup);
    setLessonWords(words);
    setStudents(studentIds);
  }

  return (
    <div>
      <div className="Heading">Lesson Plans</div>
      <div className="DateDisplay">
        {adminLessons &&
          adminLessons.map((lesson, index) => (
            <div
              onClick={() =>
                handleClick(
                  lesson.wordGroup,
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
            wordGroup={lessonWordGroup}
            words={lessonWords}
            students={students}
            setDisplay={handleChangeDisplayLessonInfo}
          />
        )}
      </div>
    </div>
  );
};

export default withFirebase(TeacherLessonsDisplay);
