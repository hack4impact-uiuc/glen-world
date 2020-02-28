import React, { useState } from "react";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
function AssignmentPage() {
  const [Date, setDate] = useState();
  function handleCalendarChange(value) {
    setDate(value);
  }
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <CalendarComponent handleChange={handleCalendarChange} />
    </div>
  );
}

export default compose(withFirebase)(AssignmentPage);
