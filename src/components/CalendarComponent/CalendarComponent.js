import React from "react";
import Calendar from 'react-calendar/dist/entry.nostyle'
import 'CalendarComponent/CalendarComponent.css'
class CalendarComponent extends React.Component {
  state = {
    date: new Date(),
  }
  onChange = date => {
    this.setState({ date })
    console.log(this.state.date)
  }
  render() {
  return (
      <div>
      <Calendar 
      onChange={this.onChange}
      value={this.state.date}
      className = "calendar"
      calendarType = "US" 
      minDetail = "month"
      />
      </div>
  )
  }
}
export default CalendarComponent