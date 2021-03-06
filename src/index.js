import React from "react";
import ReactDOM from "react-dom";
import App from "pages/App/App";
import "pages/Index/index.scss";
import * as serviceWorker from "utils/serviceWorker";
import Firebase, { FirebaseContext } from "utils/Firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
