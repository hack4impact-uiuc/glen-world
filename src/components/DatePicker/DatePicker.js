import React from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import "DatePicker/DatePicker.scss";
import { withFirebase } from "utils/Firebase";

function DatePicker(props) {
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
export default withFirebase(DatePicker);
