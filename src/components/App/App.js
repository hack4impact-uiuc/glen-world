import React from "react";
import "./App.scss";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import CreateAssignment from "../../pages/CreateAssignment/CreateAssignment";

function App() {
  return (
    <div className="App">
      <CreateAssignment />
    </div>
  );
}

export default compose(withFirebase)(App);
