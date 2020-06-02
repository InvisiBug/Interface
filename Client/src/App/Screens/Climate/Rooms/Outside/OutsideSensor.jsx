// Components
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  screenPosition: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    height: "7.5%",
    width: "150px",
    top: "10%",
    left: "86%",

    borderRadius: "20px",

    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(50, 50, 50, 0.2)",
    color: "white",
    fontFamily: "Arial",
    fontSize: "20px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  temperatureValue: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%;",
    left: "25%;"
  },
  humidityValue: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "78%"
  }
});

class OutsideSetpoint extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      computerPower: null,
      textColour: "white"
    };
  }

  componentWillMount = () => this.getData();
  componentDidMount = () =>
    (this.interval = setInterval(() => {
      this.getData();
    }, 100));
  componentWillUnmount = () => clearInterval(this.interval);

  getData = () => {
    try {
      this.setState({ textColour: "white" });
      var cache = JSON.parse(localStorage.getItem("currentWeatherData"));

      this.setState({ temperature: cache.currently.apparentTemperature });
      this.setState({ humidity: Math.ceil(cache.currently.humidity * 100) });
    } catch (error) {
      this.setState({ textColour: "orangered" });
    }
  };

  render() {
    return (
      <div className={css(styles.screenPosition)}>
        <p
          style={{ color: this.state.textColour }}
          className={css(styles.temperatureValue)}
        >
          {this.state.temperature}°C
        </p>
        <p
          style={{ color: this.state.textColour }}
          className={css(styles.humidityValue)}
        >
          {this.state.humidity}%
        </p>
      </div>
    );
  }
}

export default OutsideSetpoint;

// Hooks example

// export default function OutsideSensor() {
//
//   var cache = JSON.parse(localStorage.getItem("currentWeatherData"))
//   console.log(cache)
//
//   const [temperature, setTemperature] = useState(cache.currently.apparentTemperature);
//   const [humidity, setHumidity] = useState(cache.currently.humidity);
//
//   console.log(temperature);
//   console.log(humidity);
//   return(
//   <div className={css(styles.screenPosition)} onClick={() => this.props.showGraph("Living Room")}>
//     <p className={css(styles.temperatureValue)}>{temperature}°C</p>
//     <p className={css(styles.humidityValue)}>{Math.ceil(humidity * 100  )}%</p>
//   </div>
//   )
// }
