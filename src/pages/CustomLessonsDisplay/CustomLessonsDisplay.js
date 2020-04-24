import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import {
  TEMPLATE_LESSON_MAP,
  TEMPLATE_WORD_GROUPS,
  ADMIN_ACCOUNT
} from "utils/constants.js";
import "./CustomLessonsDisplay.scss";
import { compose } from "recompose";
import { Col, Row } from "reactstrap";
import { withRouter, Redirect, useHistory } from "react-router-dom";
import LessonDateDisplay from "../../components/LessonDateDisplay/LessonDateDisplay";
import LessonInfoDisplay from "../../components/LessonInfoDisplay/LessonInfoDisplay";
import LessonNameDisplay from "../../components/LessonNameDisplay/LessonNameDisplay";

const CustomLessonsDisplay = props => {
  const { firebase } = props;
  const [showLessons, setShowLessons] = useState([]);
  const [allLessons, setAllLessons] = useState([]);
  const [filterType, setFilterType] = useState();
  const [filterGroup, setFilterGroup] = useState();
  const [displayLesson, setDisplayLesson] = useState(null);
  const [displayLessonTemplate, setDisplayTemplate] = useState(null);
  const [displayLessonInfo, setDisplayLessonInfo] = useState(false);
  const [createLessonRedirect, setCreateLessonRedirect] = useState(false);
  const [nameMap, setNameMap] = useState({});
  const editLessonRedirect = props?.location.state?.redirect;

  /**
   *
   * wait can teachers delete whole lessons that they've already made?????
   */

  useEffect(() => {
    setTimeout(() => {
      // TODO: figure out better solution to resolve this
      // Get custom lessons made by admin
      firebase.getAdminCustomLessons(ADMIN_ACCOUNT).then(lessons => {
        setAllLessons(lessons);
      });
    }, 60); // Timeout for firebase to update and display updated lessons properly
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
    setNameMap(deploymentNameMap);
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
            </DropdownButton>
          </Col>
          {/* Cant filter by wordgroups if phonics is selected */}
          <Col>
            {filterType != "C" && (
              <DropdownButton
                id="ddown"
                title={TEMPLATE_WORD_GROUPS[filterGroup] || "WORD GROUPS"}
              >
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
                    lesson.wordGroup == TEMPLATE_WORD_GROUPS[filterGroup])
              )
              .map(lesson => (
                <div key={lesson.id} onClick={() => handleClick(lesson)}>
                  <Col>
                    <LessonNameDisplay lessonName={lesson.lessonName} />
                  </Col>
                </div>
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
};

export default compose(
  withFirebase,
  withRouter
)(CustomLessonsDisplay);
