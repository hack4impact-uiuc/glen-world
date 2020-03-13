import React from "react";
import "./App.scss";
import { withFirebase } from "utils/Firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { compose } from "recompose";
import CreateAssignment from "../../pages/CreateAssignment/CreateAssignment";
import TeacherLessonsDisplay from "TeacherLessonsDisplay/TeacherLessonsDisplay";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"} component={TeacherLessonsDisplay} />
          <Route path={"/createlesson"} component={CreateAssignment} />
        </Switch>
      </Router>
    </div>
  );
}

export default compose(withFirebase)(App);
