// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DownArrow from "../../Common/Down.png";
import UpArrow from "../../Common/Up.png";

class OurRoomSetpoint extends React.Component {
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
    }, 5 * 1000));
  componentWillUnmount = () => clearInterval(this.timer1);

  getSetpoint = () => {
    try {
      this.setState({ textColour: "white" });

      var cache = JSON.parse(localStorage.getItem("ourRoomSetpoint"));
      this.setState({ value: cache });
    } catch (error) {
      this.setState({ textColour: "orangered" });
    }
  };

  //   handleChange = (event) =>
  //   {
  //     clearInterval(this.timer1)
  //     this.timer1 = setInterval(() => { this.getSetpoint() }, 5 * 1000);
  //
  //     this.setState({value: event.target.value});
  //
  //     fetch("/api/bedroomClimate/setpoint/set",
  //     {
  //       headers: { "Content-Type": "application/json" },
  //       method: 'POST',
  //       body: JSON.stringify(
  //       {
  //         value: event.target.value
  //       }),
  //     })
  //   }

  down = () => {
    clearInterval(this.timer1);
    this.timer1 = setInterval(() => {
      this.getSetpoint();
    }, 5 * 1000);

    this.setState({ value: this.state.value - 1 });

    fetch("/api/bedroomClimate/setpoint/set", {
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

    fetch("/api/bedroomClimate/setpoint/set", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        value: this.state.value + 1
      })
    });
  };

  render() {
    return (
      <div className="ourRoomSetpointContainer">
        <img src={DownArrow} alt="" className="arrow" onClick={this.down} />
        {this.state.value}°C
        <img src={UpArrow} alt="" className="arrow" onClick={this.up} />
      </div>
    );
  }
}

export default OurRoomSetpoint;
