import React from "react";
import "./App.scss";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import CreateAssignment from "../../pages/CreateAssignment/CreateAssignment";
import ExampleComponent from "../ExampleComponent/ExampleComponent.js";

function App() {
  return (
    <div className="App">
      <ExampleComponent />
    </div>
  );
}

export default compose(withFirebase)(App);
