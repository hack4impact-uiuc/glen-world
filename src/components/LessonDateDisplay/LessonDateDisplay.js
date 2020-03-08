import React, { useState, useEffect } from "react";
import "./LessonDateDisplay.css";

function LessonDateDisplay(props) {
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    setSeconds(props.date["seconds"]);
  }, []);

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  return (
    <div className="DateIcon">
      <p className="Date">
        {Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "2-digit"
        }).format(toDateTime(seconds).getMonth())}
      </p>
    </div>
  );
}

export default LessonDateDisplay;
