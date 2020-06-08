// Components
import React from "react";

class SystemDataCollector extends React.Component {
  componentWillMount = () => {
    // this.getHeatingSchedule();
    // this.getBedroomClimateSetpoint();
  };

  componentDidMount = () => {
    this.timer1 = setInterval(() =>
      // 1 second timer
      {
        this.getHeatingSchedule();
        // this.getBedroomClimateSetpoint();
      }, 1 * 1000);

    // this.timer2 = setInterval(() => // 5 min timer
    // {
    // this.getBitcoin();
    // }, 300 * 1000)
  };

  getHeatingSchedule = () => {
    fetch("api/heating/status")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);
          localStorage.setItem("heatingSchedule", response);
        } catch {
          localStorage.setItem("heatingSchedule", null);
        }
      });
  };

  getBedroomClimateSetpoint = () => {
    fetch("/api/bedroomClimate/setpoint/status")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);
          localStorage.setItem("ourRoomSetpoint", response);
        } catch {
          localStorage.setItem("ourRoomSetpoint", null);
        }
      });
  };

  ////////////////////////
  render() {
    return null;
  }
}

export default SystemDataCollector;
