import React, { useEffect, useState } from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import "DatePicker/DatePicker.scss";
import { withFirebase } from "utils/Firebase";

function DatePicker(props) {
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (props.assignedDate) setDate(props.assignedDate);
    else setDate(new Date());
  }, [props.assignedDate]);

  function onChange(date) {
    props.handleChange(date);
  }

  return (
    <div>
      <Calendar
        onClickDay={event => {
          onChange(event);
        }}
        value={date}
        className="calendar"
        calendarType="US"
        minDetail="month"
      />
    </div>
  );
}
export default withFirebase(DatePicker);
