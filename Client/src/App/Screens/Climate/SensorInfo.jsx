// Components
import React from "react";

class SensorInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount = () => this.getData();
  componentDidMount = () =>
    (this.timer1 = setInterval(() => {
      this.getData();
    }, 100 /* 1 * 1000 */));
  componentWillUnmount = () => clearInterval(this.timer1);

  getData = () => {
    // console.log(this.props.room + " Heating Sensor")
    var cache = JSON.parse(localStorage.getItem(this.props.room + " Heating Sensor"));
    // console.log(cache)
    try {
      this.setState({ temperature: cache.temperature });
      this.setState({ humidity: cache.humidity });
      this.setState({ pressure: cache.pressure });
      this.setState({ battery: cache.battery });
    } catch (error) {
      // this.setState({titleColour: 'orangered'})
      // this.setState({colour : "rgb(" + 0 + ", " + 0 + ", " + 0 + ")"})
    }
  };

  render() {
    return (
      <div className="sensorInfo">
        <h1 className="sensorInfoTitle">Sensor Info</h1>
        <div className="sensorInfoData">
          Temperature: {this.state.temperature}°C
          <br />
          Humidity: {this.state.humidity}%<br />
          Pressure: {this.state.pressure}
          <br />
          Battery: {this.state.battery}%<br />
        </div>
      </div>
    );
  }
}

export default SensorInfo;
