import React from "react";
import { withFirebase } from "utils/Firebase";
import {
  Checkbox,
  ListItemIcon,
  Collapse,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import useStyles from "StudentList/StudentListStyles.js";

function StudentList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(
    Array(props.deployments.length)
      .fill()
      .map((_, i) => false)
  );
  const [open, setOpen] = React.useState(
    Array(props.deployments.length)
      .fill()
      .map((_, i) => false)
  );
  let deployments = props.deployments;

  console.log(selectAll);

  const handleClassClick = index => {
    let openCopy = [...open];
    openCopy[index] = !openCopy[index];
    setOpen(openCopy);
  };

  const handleStudentToggle = (studentId, deployment) => () => {
    const currentIndex = checked.indexOf(studentId);
    const deploymentIndex = deployments.indexOf(deployment);
    console.log(deploymentIndex);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(studentId);
    } else {
      newChecked.splice(currentIndex, 1);
      let selectAllCopy = [...selectAll];
      selectAllCopy[deploymentIndex] = false;
      setSelectAll(selectAllCopy);
    }

    setChecked(newChecked);
    props.handleChange(newChecked);
  };

  const handleSelectAllToggle = deployment => {
    let selectAllCopy = [...selectAll];
    let index = deployments.indexOf(deployment);
    selectAllCopy[index] = !selectAllCopy[index];
    setSelectAll(selectAllCopy);

    let newChecked = [...checked];

    if (!selectAll[index]) {
      if (!open[index]) {
        let openCopy = [...open];
        openCopy[index] = true;
        setOpen(openCopy);
      }
      // newChecked = [...checked];
      console.log(deployment);
      Object.keys(deployment.deploymentAccounts).forEach(function(
          deploymentAccountId
        ) { 
            console.log("running on " + deploymentAccountId)
            const currentIndex = checked.indexOf(deploymentAccountId);
            if (currentIndex === -1) {
              newChecked.push(deploymentAccountId);
          }
      });
    } else {
      Object.keys(deployment.deploymentAccounts).forEach(function(
          deploymentAccountId
        ) { 
            console.log(deployment);
            console.log("running on " + deploymentAccountId)
            const currentIndex = newChecked.indexOf(deploymentAccountId);
            if (newChecked[currentIndex] !== -1) {
              console.log("removing " + deploymentAccountId);
              newChecked.splice(currentIndex, 1);
          }
      });
    }

    setChecked(newChecked);
    props.handleChange(newChecked);
  };

  return (
    <div>
      <List>
        {Array.isArray(deployments) &&
          deployments.map((deployment, index) => (
            <div>
              <ListItem className={classes.listSection}>
                <ListItemText
                  className={classes.deploymentName}
                  onClick={() => handleClassClick(index)}
                >
                  {`Class: ${index + 1}`}
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemText>

                <ListItemText className={classes.selectAllText}>
                  {selectAll[index] ? "Deselect All" : "Select All"}
                </ListItemText>
                <ListItemIcon>
                  <Checkbox
                    classes={{
                      checked: classes.checked
                    }}
                    onClick={() => handleSelectAllToggle(deployment)}
                    // checked={selectAll[index]}
                    disableRipple
                  />
                </ListItemIcon>
              </ListItem>

              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                {Object.keys(deployment.deploymentAccounts).map(
                  deploymentAccountId => (
                    <ListItem
                      className={classes.nested}
                      button
                      onClick={handleStudentToggle(deploymentAccountId, deployment)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          classes={{
                            root: classes.root,
                            checked: classes.checked
                          }}
                          edge="start"
                          tabIndex={-1}
                          checked={checked.indexOf(deploymentAccountId) !== -1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${deployment.deploymentAccounts[deploymentAccountId].username}`}
                      />
                    </ListItem>
                  )
                )}
              </Collapse>
            </div>
          ))}
      </List>
    </div>
  );
}
export default withFirebase(StudentList);
