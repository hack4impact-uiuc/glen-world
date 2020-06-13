import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import { getDeploymentAccountIdsFromLesson } from "utils/Lesson";
import {
  TEMPLATE_LESSON_MAP,
  TEMPLATE_WORD_GROUPS,
  ADMIN_ACCOUNT
} from "utils/constants.js";
import "./CustomLessonsDisplay.scss";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";
import LessonInfoDisplay from "../../components/LessonInfoDisplay/LessonInfoDisplay";
import LessonNameDisplay from "../../components/LessonNameDisplay/LessonNameDisplay";

function CustomLessonsDisplay(props) {
  const { firebase } = props;
  const [allLessons, setAllLessons] = useState([]);
  const [filterType, setFilterType] = useState();
  const [filterGroup, setFilterGroup] = useState();
  const [displayLesson, setDisplayLesson] = useState(null);
  const [displayLessonTemplate, setDisplayTemplate] = useState(null);
  const [displayLessonInfo, setDisplayLessonInfo] = useState(false);
  const [createLessonRedirect, setCreateLessonRedirect] = useState(false);
  const [deletedLesson, setDeletedLesson] = useState(false);
  const [nameMap, setNameMap] = useState({});
  const editLessonRedirect = props?.location.state?.redirect;

  useEffect(() => {
    // Get custom lessons made by admin
    firebase.getAdminCustomLessons(ADMIN_ACCOUNT).then(lesson => {
      setAllLessons(lesson);
    });
  }, [editLessonRedirect, firebase, deletedLesson]); // Updates lessons when redirected to page from CreateAssignment

  async function deploymentNameMap(lesson) {
    let deploymentAccountIds = getDeploymentAccountIdsFromLesson(lesson);
    let deploymentNameMap = {};
    Promise.all(
      deploymentAccountIds.map(id => {
        return firebase.getDeploymentAccountInformation(id);
      })
    )
      .then(deploymentAccounts => {
        for (let i = 0; i < deploymentAccounts.length; i++) {
          deploymentNameMap[deploymentAccountIds[i]] =
            deploymentAccounts[i].username;
        }
        setNameMap(deploymentNameMap);
      })
      .catch(error => console.error("Error getting custom lesson: ", error));
  }

  function handleChangeDisplayLessonInfo(display) {
    setDisplayLessonInfo(display);
  }

  function handleDeletedLesson() {
    setDeletedLesson(!deletedLesson);
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
      <div className="button-bar">
        <div className="heading">Lesson Plans</div>
        <DropdownButton
          id="ddown"
          title={TEMPLATE_LESSON_MAP[filterType] || "LESSON TYPE"}
        >
          <div className="drop-down-bar">
            <Dropdown.Item
              className="drop-down"
              onClick={() => setFilterType("")}
            >
              -------
            </Dropdown.Item>
            {Object.keys(TEMPLATE_LESSON_MAP).map(key => (
              <Dropdown.Item
                className="drop-down"
                onClick={() => setFilterType(key)}
              >
                {TEMPLATE_LESSON_MAP[key]}
              </Dropdown.Item>
            ))}
          </div>
        </DropdownButton>
        {filterType != "C3" && (
          <DropdownButton
            id="ddown"
            title={TEMPLATE_WORD_GROUPS[filterGroup] || "WORD GROUPS"}
          >
            <div className="drop-down-bar">
              <Dropdown.Item
                className="drop-down"
                onClick={() => setFilterGroup("")}
              >
                -------
              </Dropdown.Item>
              {Object.keys(TEMPLATE_WORD_GROUPS).map(key => (
                <Dropdown.Item
                  className="drop-down"
                  onClick={() => setFilterGroup(key)}
                >
                  {TEMPLATE_WORD_GROUPS[key]}
                </Dropdown.Item>
              ))}
            </div>
          </DropdownButton>
        )}
        <button
          className="button"
          onClick={() => setCreateLessonRedirect(true)}
        >
          Create Lesson
        </button>
      </div>
      <div className="cards-display">
        {allLessons && (
          <div className="icon-display">
            {allLessons
              .filter(
                lesson =>
                  (!filterType || lesson.lessonTemplate === filterType) &&
                  (!filterGroup ||
                    lesson.wordGroup === TEMPLATE_WORD_GROUPS[filterGroup])
              )
              .map(lesson => (
                <div className="icon-margins">
                  <div onClick={() => handleClick(lesson)}>
                    <LessonNameDisplay lessonName={lesson.lessonName} />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <div>
        {displayLessonInfo && displayLesson && (
          <LessonInfoDisplay
            lesson={displayLesson}
            template={displayLessonTemplate}
            setDisplay={handleChangeDisplayLessonInfo}
            handleDeletedLesson={handleDeletedLesson}
            nameMap={nameMap}
          />
        )}
      </div>
    </div>
  );
}

export default compose(
  withFirebase,
  withRouter
)(CustomLessonsDisplay);
