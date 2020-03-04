import React, { useState } from "react";
import { withFirebase } from "utils/Firebase";
/**
 * Example of how to get customLessons given an adminID
 */
const ExampleComponent = ({ firebase }) => {
  const [lesson, setLesson] = useState(null);

  firebase.getLastMastered("Oar8wZRQ0JArkRU1VfBj").then(doc => {
    const lesson = doc;
    setLesson(lesson);
  });

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

  return (
    <div>
      <div> Example Component </div>
      <div> {lesson} </div>
    </div>
  );
};

export default withFirebase(ExampleComponent);
