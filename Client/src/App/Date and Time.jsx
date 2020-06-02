// Components
import React from "react";

class DateAndTime extends React.Component {
  constructor() {
    super();

    var x = 0;
    this.state = {
      time: this.getTime(new Date()),
      long: localStorage.getItem("longDate")
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      this.setState({ time: this.getTime(new Date()) });
      this.setState({ long: localStorage.getItem("longDate") });
    }, 1000);
  }

  getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  render() {
    return (
      <div className="dateContainer">
        <div className="dateText">{this.state.long}</div>
        <div className="timeText">{this.state.time}</div>
      </div>
    );
  }
}

export default DateAndTime;
