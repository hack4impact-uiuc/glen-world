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
      .map((_, i) => true)
  );
  const [open, setOpen] = React.useState(
    Array(props.deployments.length)
      .fill()
      .map((_, i) => false)
  );
  let deployments = props.deployments;

  const handleClassClick = index => {
    let openCopy = [...open];
    openCopy[index] = !openCopy[index];
    setOpen(openCopy);
  };

  const handleStudentToggle = (studentId, deploymentIndex) => () => {
    const currentIndex = checked.indexOf(studentId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(studentId);
    } else {
      newChecked.splice(currentIndex, 1);
      let selectAllCopy = [...selectAll];
      selectAllCopy[deploymentIndex] = true;
      setSelectAll(selectAllCopy);
    }

    setChecked(newChecked);
    props.handleChange(newChecked);
  };

  const handleSelectAllToggle = deployment => {
    let selectAllCopy = [...selectAll];
    console.log("select all copy original: " + selectAllCopy);
    let index = deployments.indexOf(deployment);
    console.log("index: " + index)
    selectAllCopy[index] = !selectAllCopy[index];
    console.log("post change: " + selectAllCopy);
    setSelectAll(selectAllCopy);

    let newChecked = [];

    if (selectAll[index]) {
      if (!open[index]) {
        let openCopy = [...open];
        openCopy[index] = true;
        setOpen(openCopy);
      }
      newChecked = [...checked];
      Object.keys(deployment.deploymentAccounts).forEach(function(
          deploymentAccountId
        ) {
            console.log(deploymentAccountId);
            const currentIndex = checked.indexOf(deploymentAccountId);
            if (currentIndex === -1) {
              newChecked.push(deploymentAccountId);
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
                  {selectAll[index] ? "Select All" : "Deselect All"}
                </ListItemText>
                <ListItemIcon>
                  <Checkbox
                    classes={{
                      checked: classes.checked
                    }}
                    onClick={() => handleSelectAllToggle(deployment)}
                    checked={selectAll[index]}
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
                      onClick={() => handleStudentToggle(deploymentAccountId, index)}
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
