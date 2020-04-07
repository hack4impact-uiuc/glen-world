import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
import CreateAssignment from "../../pages/CreateAssignment/CreateAssignment";

// Example constants
const LAM_ADMIN_ACCOUNT = "AxtySwFjYwR0uEsyP3Ds9nO22CY2";
const LAM_STUDENT_ACCOUNT = "Oar8wZRQ0JArkRU1VfBj";
const FATIMA_STUDENT_ACCOUNT = "S1ewuj5tOwC7z6EGTP3e";

/**
 * Example of how to get customLessons given an adminID
 */
const ExampleComponent = ({ firebase }) => {
  const [customLessons, setCustomLessons] = useState([]);

  useEffect(() => {
    firebase.getAdminCustomLessons(LAM_ADMIN_ACCOUNT).then(customLesson => {
      setCustomLessons(customLesson);
    });
  }, [firebase]);

  return (
    <div>
      {customLessons[0] && (
        <CreateAssignment existingAssignment={customLessons[0]} />
      )}
    </div>
  );
};

export default withFirebase(ExampleComponent);
