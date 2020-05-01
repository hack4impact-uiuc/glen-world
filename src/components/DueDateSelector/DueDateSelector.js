import React from "react";
import "DueDateSelector/DueDateSelector.scss";
import StudentList from "../StudentList/StudentList";
import DatePicker from "../DatePicker/DatePicker";

function DueDateSelector(props) {
  function onChange(date) {
    props.handleChange({ date });
  }

  return (
    <>
      <div>
        <StudentList />
        <DatePicker />
      </div>
      <div></div>
    </>
  );
}
export default DueDateSelector;
