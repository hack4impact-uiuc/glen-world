import React, { useState } from "react";
import { DropdownButton, DropdownItem } from "react-bootstrap";
import { Row } from "react-bootstrap";
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

  function NameSelector(deploymentAccountId) {
    return (
      <div className="select-all-margins">
        <Row>
          <div>
            <input
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
  }

  function handleClickSelectAll(deployment) {
    let index = deployments.indexOf(currentDeployment);
    let newChecked = [...studentsChecked];
    Object.keys(deployment.deploymentAccounts).foreach(deploymentAccountId => {
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

    let newChooseAll = [...chooseAll];
    newChooseAll[index] = !newChooseAll[index];
    setChooseAll(newChooseAll);
  }

  return (
    <div className="student-selector">
      <DropdownButton
        id="deployment-ddown"
        title={
          (currentDeployment &&
            "Class " + (deployments.indexOf(currentDeployment) + 1)) ||
          "Select a Class"
        }
      >
        {deployments.map((deployment, index) => (
          <DropdownItem
            className="option-ddown"
            onClick={() => setCurrentDeployment(deployment)}
          >
            {"Class " + (index + 1)}
          </DropdownItem>
        ))}
      </DropdownButton>
      {currentDeployment && (
        <div>
          <div className="select-all-checkbox">
            <div className="select-all-margins">
              <label className="select-all-label">Select All</label>
            </div>
            <div>
              <input
                id="cbox"
                type="checkbox"
                checked={chooseAll[deployments.indexOf(currentDeployment)]}
                onClick={() => handleClickSelectAll(currentDeployment)}
              />
            </div>
          </div>
          <div className="accounts-list">
            {Object.keys(currentDeployment.deploymentAccounts).map(
              deploymentAccountId => NameSelector(deploymentAccountId)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default withFirebase(StudentSelector);
