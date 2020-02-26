import React from "react";
import { withFirebase } from "utils/Firebase";

const ExampleComponent = ({ firebase }) => {
  const getData = () =>
    firebase
      .customLessons("AxtySwFjYwR0uEsyP3Ds9nO22CY2")
      .get()
      .then(snapshot =>
        snapshot.docs.map(d => {
          const data = d.data();
          return { id: d.id, ...data };
        })
      );
  getData().then(result => console.log(result));

  return <div> Example Component </div>;
};

export default withFirebase(ExampleComponent);
