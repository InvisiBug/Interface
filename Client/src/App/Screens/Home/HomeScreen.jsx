// Components
import React from "react";

// Modules
import WeatherForecast from "./WeatherForecast";
import CurrentWeather from "./CurrentWeather";
import BitcoinTicker from "./Bitcoin";

class Home extends React.Component {
  render() {
    return (
      <div>
        <CurrentWeather />
        <WeatherForecast />
        <BitcoinTicker />
      </div>
    );
  }
}

export default Home;
