// Components
import React from "react";

class LocalStorageUpdater extends React.Component {
  componentWillMount = () => {
    // localStorage.clear();
    this.getWeatherForecast();
    this.getCurrentWeather();
    this.getDate();
    this.getBitcoin();
  };

  componentDidMount = () => {
    this.weather = setInterval(() => {
      this.getWeatherForecast();
      this.getCurrentWeather();
      this.getDate();
      this.getBitcoin();
    }, 3600 * 1000); // 1 Hour Update Cycle
  };

  getBitcoin = () => {
    fetch("http://api.coindesk.com/v1/bpi/currentprice.json")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);
          localStorage.setItem("bitcoin", parseFloat(resJSON.bpi.GBP.rate.replace(/,/g, "") * 0.97).toFixed());
        } catch {
          localStorage.setItem("bitcoin", null);
        }
      });
  };

  getWeatherForecast = () => {
    fetch("/api/weather/get/forecast")
      .then(response => response.text())
      .then(response => {
        try {
          JSON.parse(response);
          localStorage.setItem("futureWeatherData", response);
        } catch (error) {
          console.log(error);
        }
      });
  };

  getCurrentWeather() {
    fetch("/api/weather/get/current")
      .then(response => response.text())
      .then(response => {
        try {
          var weatherData = JSON.parse(response);

          var deviceData = {
            isConnected: true,
            temperature: Math.round(weatherData.currently.apparentTemperature * 10) / 10,
            humidity: Math.ceil(weatherData.currently.humidity * 100)
          };

          localStorage.setItem("Outside Heating Sensor", JSON.stringify(deviceData));
        } catch (err) {
          console.log(err);
        }
      });
  }

  getDate = () => {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    var ordinal = ordinal_suffix_of(day);

    function ordinal_suffix_of(i) {
      var j = i % 10;
      var k = i % 100;

      if (j === 1 && k !== 11) return i + "st";
      if (j === 2 && k !== 12) return i + "nd";
      if (j === 3 && k !== 13) return i + "rd";

      return i + "th";
    }
    localStorage.setItem("longDate", ordinal + " " + months[monthIndex] + " " + year);
  };

  render() {
    return null;
  }
}

export default LocalStorageUpdater;