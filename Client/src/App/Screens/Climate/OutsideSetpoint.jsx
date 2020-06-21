// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { StyleSheet, css } from "aphrodite";

import DownArrow from "./Common/Down.png";
import UpArrow from "./Common/Up.png";

const styles = StyleSheet.create({
  screenPosition: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    height: "7.5%",
    width: "150px",
    top: "18%",
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
      textColour: "white"
    };
  }

  componentWillMount = () => this.getSetpoint();
  componentDidMount = () =>
    (this.timer1 = setInterval(() => {
      this.getSetpoint();
    }, 100));
  componentWillUnmount = () => clearInterval(this.timer1);

  getSetpoint = () => {
    try {
      this.setState({ textColour: "white" });
      var cache = JSON.parse(localStorage.getItem("Outside Setpoint"));

      this.setState({ value: cache });
    } catch (error) {
      this.setState({ textColour: "orangered" });
    }
  };

  down = () => {
    clearInterval(this.timer1);
    this.timer1 = setInterval(() => {
      this.getSetpoint();
    }, 5 * 1000);

    this.setState({ value: this.state.value - 1 });

    fetch("/api/calorImperium/outside/set", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        value: this.state.value - 1
      })
    });
  };

  up = () => {
    clearInterval(this.timer1);
    this.timer1 = setInterval(() => {
      this.getSetpoint();
    }, 5 * 1000);

    this.setState({ value: this.state.value + 1 });

    fetch("/api/calorImperium/outside/set", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        value: this.state.value + 1
      })
    });
  };

  render() {
    return (
      <div className={css(styles.screenPosition)}>
        <img src={DownArrow} alt="" className="arrow" onClick={this.down} />
        {this.state.value}°C
        <img src={UpArrow} alt="" className="arrow" onClick={this.up} />
      </div>
    );
  }
}

export default OutsideSetpoint;
