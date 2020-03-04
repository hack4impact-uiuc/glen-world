import React from "react";
import "./App.css";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import ExampleComponent from "ExampleComponent/ExampleComponent";

import AssignmentPage from "AssignmentPage/AssignmentPage";

function App() {
  return (
    <div className="App">
      {/* <ExampleComponent /> */}
      <AssignmentPage />
    </div>
  );
}

export default compose(withFirebase)(App);
