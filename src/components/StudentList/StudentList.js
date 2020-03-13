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
  const [selectAll, setSelectAll] = React.useState(true);
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

  const handleStudentToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      setSelectAll(true);
    }

    setChecked(newChecked);
    props.handleChange(newChecked);
  };


  const handleSelectAllToggle = deployment => {
    setSelectAll(!selectAll);
    let newChecked = [];

    if (selectAll) { // check all the boxes
      let index = deployments.indexOf(deployment);
      if(!open[index]) {
        let openCopy = [...open];
        openCopy[index] = true;
        setOpen(openCopy);
      }
      newChecked = [...checked];
      Object.keys(deployment.deploymentAccounts).forEach(function (deploymentAccountId) {
        console.log(deploymentAccountId);
        const currentIndex = checked.indexOf(deploymentAccountId);
        if (currentIndex === -1) {
          newChecked.push(deploymentAccountId);
        }
      });
    }

    setChecked(newChecked);
    props.handleChange(newChecked);
  }

  return (
    <div>
      <List>
        {Array.isArray(deployments) &&
          deployments.map((deployment, index) => (
            <div>
              <ListItem
                className={classes.listSection}
              >
                <ListItemText
                  className={classes.deploymentName}
                  onClick={() => handleClassClick(index)}
                >
                  {`Class: ${index + 1}`}
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemText>
                
                <ListItemText
                  className={classes.selectAllText}
                >
                  {selectAll ? "Select All" : "Deselect All" }
                </ListItemText>
                <ListItemIcon>
                  <Checkbox
                    classes={{
                      checked: classes.checked
                    }}
                    onClick={() => handleSelectAllToggle(deployment)}
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
                      onClick={handleStudentToggle(deploymentAccountId)}
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
