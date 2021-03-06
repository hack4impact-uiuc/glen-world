import React from "react";
import "./App.scss";
import { withFirebase } from "utils/Firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { compose } from "recompose";
import CreateAssignment from "../../pages/CreateAssignment/CreateAssignment";
import Confirmation from "../../pages/Confirmation/Confirmation";
import CustomLessonsDisplay from "../../pages/CustomLessonsDisplay/CustomLessonsDisplay";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"} component={CustomLessonsDisplay} />
          <Route path={"/createlesson"} component={CreateAssignment} />
          <Route path={"/confirmation"} component={Confirmation} />
        </Switch>
      </Router>
    </div>
  );
}

export default compose(withFirebase)(App);
