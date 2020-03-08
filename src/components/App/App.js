import React from "react";
import "./App.css";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import ExampleComponent from "ExampleComponent/ExampleComponent";

import TeacherLessonsDisplay from "components/TeacherLessonsDisplay/TeacherLessonsDisplay";

function App() {
  return (
    <div className="App">
      {/* <ExampleComponent /> */}
      <TeacherLessonsDisplay />
    </div>
  );
}

export default compose(withFirebase)(App);
