import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
/**
 * Example of how to get customLessons given an adminID
 */
const ExampleComponent = ({ firebase }) => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    firebase.getCustomLessons("AxtySwFjYwR0uEsyP3Ds9nO22CY2").then(doc => {
      setLessons(doc);
    });
  }, []);

  return (
    <div>
      <div> Example Component </div>
      {lessons.map(lesson => (
        <div> {lesson.wordGroup} </div>
      ))}
    </div>
  );
};

export default withFirebase(ExampleComponent);
