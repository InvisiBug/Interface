// Components
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Thermometer from "react-thermometer-component";

// Images & Icons
import Image from "react-bootstrap/Image";
import ClearDay from "./Weather Icons/clear-day.png";
import ClearNight from "./Weather Icons/clear-night.png";
import CloudyDay from "./Weather Icons/partly-cloudy-day.png";
import CloudyNight from "./Weather Icons/partly-cloudy-night.png";
import Cloudy from "./Weather Icons/cloudy.png";
import Rain from "./Weather Icons/rain.png";
import Sleet from "./Weather Icons/sleet.png";
import Snow from "./Weather Icons/snow.png";
import Wind from "./Weather Icons/wind.png";
import Fog from "./Weather Icons/fog.png";

const weatherToImage = {
  "clear-day": ClearDay,
  "clear-night": ClearNight,
  "partly-cloudy-day": CloudyDay,
  "partly-cloudy-night": CloudyNight, // This is actually correct, look here for more info (https://darksky.net/dev/docs/faq)
  cloudy: Cloudy,
  rain: Rain,
  sleet: Sleet,
  snow: Snow,
  wind: Wind,
  fog: Fog
};

class CurrentWeather extends React.Component {
  componentWillMount() {
    this.getWeatherData();
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getWeatherData();
    }, 3600 * 1000);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  getWeatherData = () =>
    // Data loaded from cache
    {
      try {
        var cache = JSON.parse(localStorage.getItem("currentWeatherData"))
          .currently;

        this.setState({
          apparentTemperature: cache.apparentTemperature,
          rainProbability: Math.round(cache.precipProbability),
          rainIntensity: Math.round(cache.precipIntensity),
          humidity: cache.humidity * 100,
          summary: cache.summary,
          icon: weatherToImage[cache.icon],
          apiFinished: true
        });
      } catch (err) {
        console.log(err);
      }
    };

  render() {
    return this.state.apiFinished ? (
      <Container className="currentWeatherModule">
        <h4 className="currentWeatherSummary">{this.state.summary}</h4>

        <div className="currentWeatherContent">
          <Row>
            <Col md={{ span: 6, offset: 2 }}>
              <Image src={this.state.icon} className="currentWeatherIcon" />
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 5, offset: 0 }}>
              <p>
                Current Rain <br />
                {this.state.rainIntensity}%
              </p>
            </Col>

            <Col md={5}>
              <p>
                Rain Chance <br />
                {this.state.rainProbability}%
              </p>
            </Col>
          </Row>

          <div className="currentWeatherThermo">
            <Thermometer
              theme="light"
              value={this.state.apparentTemperature}
              max="20"
              format="°C"
              size="medium"
              height="230"
            />
          </div>
        </div>
      </Container>
    ) : null;
  }
}

export default CurrentWeather;
