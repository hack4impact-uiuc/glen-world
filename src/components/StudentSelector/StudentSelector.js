import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Button, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import "./StudentSelector.scss";

function StudentSelector(props) {
  const [currentDeployment, setCurrentDeployment] = useState();
  const [studentsChecked, setStudentsChecked] = useState([]);
  const [chooseAll, setChooseAll] = useState(
    Array(props.deployments.length)
      .fill()
      .map((_, i) => false)
  );
  let deployments = props.deployments;

  function nameSelector(deploymentAccountId) {
    return (
      <div className="select-all-margins">
        <Row>
          <div>
            <input
              class="move-down"
              id="cbox"
              type="checkbox"
              checked={studentsChecked.indexOf(deploymentAccountId) !== -1}
              onClick={() => handleClickStudent(deploymentAccountId)}
            />
          </div>
          <div>
            <label className="student-name-label">
              {
                currentDeployment.deploymentAccounts[deploymentAccountId]
                  .username
              }
            </label>
          </div>
        </Row>
      </div>
    );
  }
  function handleClickStudent(deploymentAccountId) {
    const currentIndex = studentsChecked.indexOf(deploymentAccountId);
    const newChecked = [...studentsChecked];

    if (currentIndex === -1) {
      newChecked.push(deploymentAccountId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    const setChecked = Array.from(new Set(newChecked));
    setStudentsChecked(setChecked);
    props.handleChange(setChecked);
    console.log(setChecked);
  }

  function handleClickSelectAll(deployment) {
    let index = deployments.indexOf(currentDeployment);
    let deploymentAccounts = [];
    let selectAll = false;
    let newChecked = [...studentsChecked];
    let indexes = [];
    Object.keys(deployment.deploymentAccounts).map(deploymentAccountId => {
      if (!chooseAll[index]) {
        newChecked.push(deploymentAccountId);
      } else {
        let removeIndex = newChecked.indexOf(deploymentAccountId);
        newChecked.splice(removeIndex, 1);
      }
    });
    //So for optimization, the select button works differently here than it does for the word group select all
    //if we want to make it be the same, for each render, it will need to check if all the students in that deployment has been selected

    const setChecked = Array.from(new Set(newChecked));
    setStudentsChecked(setChecked);
    props.handleChange(setChecked);
    console.log(setChecked);

    let newChooseAll = [...chooseAll];
    newChooseAll[index] = !newChooseAll[index];
    setChooseAll(newChooseAll);
  }
  //the key in the DropdownButton is hacky fix to the issue that the dropdown menu doesnt close upon selection
  return (
    <div className="student-selector">
      <DropdownButton
        key={new Date().getTime()}
        id="depoyment-ddown"
        title={
          (currentDeployment &&
            "Class " + (deployments.indexOf(currentDeployment) + 1)) ||
          "Class:"
        }
      >
        {deployments.map((deployment, index) => (
          <Dropdown
            className="option-ddown"
            onClick={() => setCurrentDeployment(deployment)}
          >
            {"Class " + (index + 1)}
          </Dropdown>
        ))}
      </DropdownButton>
      {currentDeployment && (
        <div>
          <div className="select-all-checkbox">
            <Row>
              <div className="select-all-margins">
                <label className="select-all-label">Select All</label>
              </div>
              <div>
                <input
                  class="move-down"
                  id="cbox"
                  type="checkbox"
                  checked={chooseAll[deployments.indexOf(currentDeployment)]}
                  onClick={() => handleClickSelectAll(currentDeployment)}
                />
              </div>
            </Row>
          </div>
          <div className="accounts-list">
            {Object.keys(currentDeployment.deploymentAccounts).map(
              deploymentAccountId => nameSelector(deploymentAccountId)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default withFirebase(StudentSelector);