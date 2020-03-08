import React from "react";
import "./App.css";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import ExampleComponent from "ExampleComponent/ExampleComponent";
import AssignmentPage from "../AssignmentPage/AssignmentPage";
import StudentList from "../StudentList/StudentList";

function App() {
  return (
    <div className="App">
      <AssignmentPage />
    </div>
  );
}

export default compose(withFirebase)(App);
