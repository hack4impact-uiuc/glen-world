import React from "react";
import "./App.css";
import { withFirebase } from "utils/Firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { compose } from "recompose";
import AssignmentPage from "../../pages/AssignmentPage/AssignmentPage";
import TeacherLessonsDisplay from "TeacherLessonsDisplay/TeacherLessonsDisplay";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"} component={TeacherLessonsDisplay} />
          <Route path={"/createlesson"} component={AssignmentPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default compose(withFirebase)(App);
