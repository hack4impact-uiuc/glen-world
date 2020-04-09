import React, { useState, useEffect } from "react";
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
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(
    Array(props.deployments.length)
      .fill()
      .map((_, i) => false)
  );
  let deployments = props.deployments;

  useEffect(() => {
    if (props.assignedStudents) setChecked(props.assignedStudents);
  }, []);

  const handleClick = index => {
    let openCopy = [...open];
    openCopy[index] = !openCopy[index];
    setOpen(openCopy);
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleChange(newChecked);
  };
  return (
    <div>
      <List>
        {Array.isArray(deployments) &&
          deployments.map((deployment, index) => (
            <div key={index}>
              <ListItem
                button
                onClick={() => handleClick(index)}
                className={classes.listSection}
              >
                {`Deployment: ${index + 1}`}
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                {Object.keys(deployment.deploymentAccounts).map(
                  deploymentAccountId => (
                    <ListItem
                      key={deploymentAccountId}
                      className={classes.nested}
                      button
                      onClick={handleToggle(deploymentAccountId)}
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
