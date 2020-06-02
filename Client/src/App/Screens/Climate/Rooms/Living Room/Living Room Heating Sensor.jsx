// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class LivingRoom extends React.Component {
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
      var cache = JSON.parse(
        localStorage.getItem("Living Room Heating Sensor")
      );

      this.setState({ temperature: cache.temperature });
      this.setState({ humidity: cache.humidity });
    } catch (error) {
      this.setState({ textColour: "orangered" });
    }
  };

  render() {
    return (
      <div
        className="livingRoomValuesContainer"
        onClick={() => this.props.showGraph("Living Room")}
      >
        <p style={{ color: this.state.textColour }} className="tempText">
          {this.state.temperature}°C
        </p>
        <p style={{ color: this.state.textColour }} className="humidityText">
          {this.state.humidity}%
        </p>
      </div>
    );
  }
}

export default LivingRoom;
