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
    }

    setChecked(newChecked);
    props.handleChange(newChecked);
  };


  function handleSelectAllToggle() {
    // console.log(selected!)
    console.log("hello!")
    setSelectAll(!selectAll);
    console.log(selectAll);

    console.log(checked);

    

    if (selectAll) { // check all the boxes
      // let allChecked = Array(checked.length).fill().map((_, i) => true)
      // setChecked(allChecked);
      console.log("check all boxes!");

    } else { // unchecked all the boxes
      // let allUnchecked = Array(checked.length).fill().map((_, i) => false)
      // setChecked(allUnchecked);
      let newChecked = [];
      setChecked(newChecked);
      props.handleChange(newChecked);
    }

    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }

    // setChecked(newChecked);
    // props.handleChange(newChecked);
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
                <ListItemIcon>
                  <Checkbox
                    classes={{
                      root: classes.root,
                      checked: classes.checked
                    }}
                    onClick={handleSelectAllToggle}
                    edge="start"
                    // tabIndex={-1}
                    // checked={checked.indexOf(deploymentAccountId) !== -1}
                    disableRipple
                  />
                  {selectAll ? "Select All" : "Deselect All" }
                </ListItemIcon>
                <ListItemText
                  button
                  onClick={() => handleClassClick(index)}
                >
                  {`Class: ${index + 1}`}
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemText>
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
