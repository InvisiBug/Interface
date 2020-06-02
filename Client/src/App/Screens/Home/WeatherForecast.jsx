// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Card      from 'react-bootstrap/Card';
import Table from "react-bootstrap/Table";
import { timeToDay, Unix_timestamp } from "../../Common Modules/Functions.jsx";

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
  "partly-cloudy-night": ClearDay, // This is actually correct, look here for more info (https://darksky.net/dev/docs/faq)
  cloudy: Cloudy,
  rain: Rain,
  sleet: Sleet,
  snow: Snow,
  wind: Wind,
  fog: Fog
};

class WeatherForecast extends React.Component {
  componentWillMount = () => {
    this.getWeatherData();
  };

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.getWeatherData();
    }, 3600 * 1000); // 10 min update cycle
  };

  componentWillUnmount = () => clearInterval(this.interval);

  getWeatherData = () =>
    // Data is loaded from cache
    {
      try {
        var cachedData = JSON.parse(localStorage.getItem("futureWeatherData"))
          .daily;

        this.setState({ a: cachedData.data[0] });
        this.setState({ b: cachedData.data[1] });
        this.setState({ c: cachedData.data[2] });
        this.setState({ d: cachedData.data[3] });
        this.setState({ e: cachedData.data[4] });

        this.setState({ info: cachedData.summary });
      } catch (error) {
        console.log(error);
      }
    };

  render() {
    return this.state.e ? (
      <Container className="weatherForecastModule">
        <Row>
          <Col>
            <h3 style={{ marginTop: "2.5%" }}> Weekly Weather forecast </h3>
            <p style={{ fontSize: "20px" }}>{this.state.info}</p>
            <Table responsive borderless>
              <tbody className="weatherScreenforecastTable">
                <tr>
                  <th />
                  <th>{timeToDay(this.state.a.time)}</th>
                  <th>{timeToDay(this.state.b.time)}</th>
                  <th>{timeToDay(this.state.c.time)}</th>
                  <th>{timeToDay(this.state.d.time)}</th>
                  <th>{timeToDay(this.state.e.time)}</th>
                </tr>
                <tr>
                  <td>Condition</td>
                  <td>
                    <Image
                      src={weatherToImage[this.state.a.icon]}
                      className="wetherScreenforecastIcon"
                    />
                  </td>
                  <td>
                    <Image
                      src={weatherToImage[this.state.b.icon]}
                      className="wetherScreenforecastIcon"
                    />
                  </td>
                  <td>
                    <Image
                      src={weatherToImage[this.state.c.icon]}
                      className="wetherScreenforecastIcon"
                    />
                  </td>
                  <td>
                    <Image
                      src={weatherToImage[this.state.d.icon]}
                      className="wetherScreenforecastIcon"
                    />
                  </td>
                  <td>
                    <Image
                      src={weatherToImage[this.state.e.icon]}
                      className="wetherScreenforecastIcon"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Maximum</td>
                  <td>{Math.round(this.state.a.apparentTemperatureHigh)}°C</td>
                  <td>{Math.round(this.state.b.apparentTemperatureHigh)}°C</td>
                  <td>{Math.round(this.state.c.apparentTemperatureHigh)}°C</td>
                  <td>{Math.round(this.state.d.apparentTemperatureHigh)}°C</td>
                  <td>{Math.round(this.state.e.apparentTemperatureHigh)}°C</td>
                </tr>
                <tr>
                  <td>Mininimum</td>
                  <td>{Math.round(this.state.a.apparentTemperatureLow)}°C</td>
                  <td>{Math.round(this.state.b.apparentTemperatureLow)}°C</td>
                  <td>{Math.round(this.state.c.apparentTemperatureLow)}°C</td>
                  <td>{Math.round(this.state.d.apparentTemperatureLow)}°C</td>
                  <td>{Math.round(this.state.e.apparentTemperatureLow)}°C</td>
                </tr>
                <tr>
                  <td>Sunrise</td>
                  <td>{Unix_timestamp(this.state.a.sunriseTime)}</td>
                  <td>{Unix_timestamp(this.state.b.sunriseTime)}</td>
                  <td>{Unix_timestamp(this.state.c.sunriseTime)}</td>
                  <td>{Unix_timestamp(this.state.d.sunriseTime)}</td>
                  <td>{Unix_timestamp(this.state.e.sunriseTime)}</td>
                </tr>
                <tr>
                  <td>Sunset</td>
                  <td>{Unix_timestamp(this.state.a.sunsetTime)}</td>
                  <td>{Unix_timestamp(this.state.b.sunsetTime)}</td>
                  <td>{Unix_timestamp(this.state.c.sunsetTime)}</td>
                  <td>{Unix_timestamp(this.state.d.sunsetTime)}</td>
                  <td>{Unix_timestamp(this.state.e.sunsetTime)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    ) : null;
  }
}

export default WeatherForecast;
