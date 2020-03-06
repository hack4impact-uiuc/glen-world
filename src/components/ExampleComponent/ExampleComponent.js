import React, { useState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
/**
 * Example of how to get customLessons given an adminID
 */
const ExampleComponent = ({ firebase }) => {
  return (
    <div>
      <div> Example Component </div>
    </div>
  );
};

export default withFirebase(ExampleComponent);
