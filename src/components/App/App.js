import React from "react";
import "./App.css";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import ExampleComponent from "ExampleComponent/ExampleComponent";

function App() {
  return (
    <div className="App">
      <ExampleComponent />
    </div>
  );
}

export default compose(withFirebase)(App);
