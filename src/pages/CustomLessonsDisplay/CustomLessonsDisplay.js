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
import { Col, Row } from "reactstrap";
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
  const [nameMap, setNameMap] = useState({});
  const editLessonRedirect = props?.location.state?.redirect;

  useEffect(() => {
    // Get custom lessons made by admin
    firebase.getAdminCustomLessons(ADMIN_ACCOUNT).then(lesson => {
      setAllLessons(lesson);
    });
  }, [editLessonRedirect]); // Updates lessons when redirected to page from CreateAssignment

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
        <Row>
          <Col>
            <div className="heading">Lesson Plans</div>
          </Col>
          <Col>
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
          </Col>
          <Col>
            {filterType != "C" && (
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
          </Col>
          <Col>
            <button
              className="button"
              onClick={() => setCreateLessonRedirect(true)}
            >
              Create Lesson
            </button>
          </Col>
        </Row>
      </div>
      <div className="cards-display">
        {allLessons && (
          <Row className="justify-content-md-center">
            {allLessons
              .filter(
                lesson =>
                  (!filterType || lesson.lessonTemplate == filterType) &&
                  (!filterGroup ||
                    lesson.wordGroup === TEMPLATE_WORD_GROUPS[filterGroup])
              )
              .map(lesson => (
                <Col key={lesson.id} onClick={() => handleClick(lesson)}>
                  <LessonNameDisplay lessonName={lesson.lessonName} />
                </Col>
              ))}
          </Row>
        )}
      </div>
      <div>
        {displayLessonInfo && displayLesson && (
          <LessonInfoDisplay
            lesson={displayLesson}
            template={displayLessonTemplate}
            setDisplay={handleChangeDisplayLessonInfo}
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
