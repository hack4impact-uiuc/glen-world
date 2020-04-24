import React, { useState, useEffect } from "react";
import {DropdownButton, Dropdown} from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import { TEMPLATE_LESSON_MAP, TEMPLATE_WORD_GROUPS, ADMIN_ACCOUNT } from "utils/constants.js";
import "./CustomLessonsDisplay.scss";
import { compose } from "recompose";
import {Col, Row} from "reactstrap";
import { withRouter, Redirect, useHistory } from "react-router-dom";
import LessonDateDisplay from "../../components/LessonDateDisplay/LessonDateDisplay";
import LessonInfoDisplay from "../../components/LessonInfoDisplay/LessonInfoDisplay";
import LessonNameDisplay from "../../components/LessonNameDisplay/LessonNameDisplay";

const CustomLessonsDisplay = props => {
  const { firebase } = props;
  const [showLessons, setShowLessons] = useState([]);
  const [allLessons, setAllLessons] = useState([]);
  const [vocabLessons, setVocabLessons] = useState([]);
  const [writingLessons, setWritingLessons] = useState([]);
  const [phonicsLessons, setPhonicsLessons] = useState([]);
  const [displayLesson, setDisplayLesson] = useState(null);
  const [displayLessonTemplate, setDisplayTemplate] = useState(null);
  const [displayLessonStudents, setDisplayStudents] = useState([]);
  const [displayLessonInfo, setDisplayLessonInfo] = useState(false);
  const [createLessonRedirect, setCreateLessonRedirect] = useState(false);
  const[nameMap, setNameMap] = useState({});
  const editLessonRedirect = props?.location.state?.redirect;

  const [filterType, setFilterType] = useState();
  const [filterGroup, setFilterGroup] = useState();

  function orderAdminLessons(reverse) {
    const sortedLessons = [...showLessons].sort((a, b) => {
      if (reverse) {
        return b.dueDate["seconds"] - a.dueDate["seconds"];
      } else {
        return a.dueDate["seconds"] - b.dueDate["seconds"];
      }
    });
    setShowLessons(sortedLessons);
  }

  function setLessonLists(lessons) {
    setAllLessons(lessons)
    let tempVocabList = []
    let tempWritingList = []
    let tempPhonicsList = []
    lessons.forEach( lesson => {
      let lessonType = lesson.lessonTemplate;
      if (lessonType == "A") {
        tempVocabList.push(lesson)
      } else if (lessonType == "A3") {
        tempWritingList.push(lesson)
      } else if (lessonType == "C") {
        tempPhonicsList.push(lesson)
      }
     })
    setVocabLessons(tempVocabList)
    setWritingLessons(tempWritingList)
    setPhonicsLessons(tempPhonicsList)   
  }

  function filterByVocab() {
    setShowLessons(vocabLessons)
  }

  function filterByWriting() {
    setShowLessons(writingLessons)
  }

  function filterByPhonics() {
    setShowLessons(phonicsLessons)
    setFilterType("C")
  }

  function noFilter(value) {
    setShowLessons(allLessons)
    if (value == "type") {
      setFilterType("")
    } else if (value == "group") {
      setFilterGroup("")
    }
  }

  function filterByWordGroup(value) {
    setShowLessons(phonicsLessons)
  }

  function filterByType(value) {
    // Promise.all(
    //   setFilterType(value)
    // ).then(() => {
    //   filter()
    // });
    setFilterType(value)
    filter()
  }
  function filterByGroup(value) {
    // Promise.all(
    //   setFilterGroup(value)
    // ).then(() => {
    //   filter()
    // });
    setFilterGroup(value)
    filter()
  }

  //**FIX ? ADD ALL ALL THE FILTERING LOGIC */
  function filter() {
    if (!filterGroup || !filterType) {
      if (filter)
    }
    if (filterType == "C") {
      setShowLessons(phonicsLessons)
    } 
  }

  useEffect(() => {
    setTimeout(() => {
      // TODO: figure out better solution to resolve this
      // Get custom lessons made by admin
      firebase.getAdminCustomLessons(ADMIN_ACCOUNT).then(lessons => {
        setShowLessons(lessons);
        setLessonLists(lessons);
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
          <Row>
          <button
            className="button"
            onClick={() => setCreateLessonRedirect(true)}
          >
            Create Lesson
          </button>

          <DropdownButton id="lesson-type" title="LESSON TYPE">
          <Dropdown.Item onClick={() => noFilter("type")}>-------</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterType("C")}>Phonics</Dropdown.Item>
            <Dropdown.Item onClick={filterByWriting}>Writing</Dropdown.Item>
            <Dropdown.Item onClick={filterByVocab}>Vocab</Dropdown.Item>
          </DropdownButton>
          {filterType != "C" && 
          <DropdownButton id="lesson-type" title="WORD GROUPS">
            <Dropdown.Item onClick={() => noFilter("group")}>-------</Dropdown.Item>
            {Object.keys(TEMPLATE_WORD_GROUPS).map(key => (
              <Dropdown.Item onClick={() =>filterByWordGroup(TEMPLATE_WORD_GROUPS[key])}>{TEMPLATE_WORD_GROUPS[key]}</Dropdown.Item>
            ))}
          </DropdownButton>
          }
          </Row>
      </div>
      <div className="name-display">
        {showLessons &&
          showLessons.map(lesson => (
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
