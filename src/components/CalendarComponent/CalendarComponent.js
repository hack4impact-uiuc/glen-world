import React from "react";
import Calendar from 'react-calendar/dist/entry.nostyle'
import 'CalendarComponent/CalendarComponent.css'
//import 'react-calendar/dist/Calendar.css'
// import { Calendar} from 'antd';
import {Jumbotron} from 'react-bootstrap';
import 'antd/dist/antd.css'
class CalendarComponent extends React.Component {
  onPanelChange(value, mode) {
    console.log(value, mode);
  }
  render() {
  return (
    <div style={{ color: '#1DA57A', width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>

      <Calendar calendarType = "US" 
      minDetail = "month"
      nextAriaLabel = "potato"
      className = "calendar"
      style = {{
        background: '#DD98FD'
      }}
        />
    </div>
  )
  }
}
export default CalendarComponent