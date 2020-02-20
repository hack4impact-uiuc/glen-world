import React from "react";
import { withFirebase } from "utils/Firebase";

const ExampleComponent = ({ firebase }) => {
  const getData = () =>
    firebase
      .getLesson()
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(doc =>
          Object.assign(doc.data(), { id: doc.id })
        );
      });

  getData().then(result => console.log(result));

  return <div> Example Component </div>;
};

export default withFirebase(ExampleComponent);
