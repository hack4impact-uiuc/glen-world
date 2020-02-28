import React, { useState, setState, useEffect } from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import "CalendarComponent/CalendarComponent.css";
import { withFirebase } from "utils/Firebase";
function CalendarComponent(props) {
  function onChange(date) {
    props.handleChange({ date });
  }

  return (
    <div>
      <Calendar
        onClickDay={event => {
          onChange(event);
        }}
        defaultValue={new Date()}
        className="calendar"
        calendarType="US"
        minDetail="month"
      />
    </div>
  );
}
export default withFirebase(CalendarComponent);
