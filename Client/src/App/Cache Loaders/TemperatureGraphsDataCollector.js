// Components
import React from "react";

class SystemDataCollector extends React.Component {
  componentWillMount = () => {
    this.getDay();
    this.getWeek();
    this.getMonth();
    this.getYear();
  };

  componentDidMount = () => {
    this.timer1 = setInterval(() => {}, 1 * 1000); // 1 second timer

    this.timer2 = setInterval(() => {
      // 5 min timer
      this.getDay();
      this.getWeek();
      this.getMonth();
      this.getYear();
    }, 300 * 1000);
  };

  getDay = () => {
    fetch("/api/bedroomClimate/daily")
      .then(response => response.text())
      .then(response => {
        try {
          var data = JSON.parse(response);

          var newArray = [];

          for (var i = 0; i < data.length; i++) {
            newArray.push({
              Hour: data[i].Timestamp.Hour,
              Temperature: data[i].Temperature,
              Humidity: data[i].Humidity
            });
          }

          localStorage.setItem("dayGraph", JSON.stringify(newArray));
        } catch {
          localStorage.setItem("dayGraph", null);
        }
      });
  };

  getWeek = () => {
    fetch("/api/bedroomClimate/weekly")
      .then(response => response.text())
      .then(response => {
        try {
          var data = JSON.parse(response);

          var newArray = [];

          for (var i = 0; i < data.length; i++) {
            let day;

            if (data[i].Timestamp.Hour === 0) {
              day = data[i].Timestamp.Days;
            } else {
              day = null;
            }

            newArray.push({
              Day: day,
              Temperature: data[i].Temperature,
              Humidity: data[i].Humidity
            });
          }
          localStorage.setItem("weekGraph", JSON.stringify(newArray));
        } catch {
          localStorage.setItem("weekGraph", null);
        }
      });
  };

  getMonth = () => {
    fetch("/api/bedroomClimate/Monthly")
      .then(response => response.text())
      .then(response => {
        try {
          var data = JSON.parse(response);

          var newArray = [];

          for (var i = 0; i < data.length; i++) {
            let day;

            if (
              data[i].Timestamp.Days === "Monday" &&
              data[i].Timestamp.Hour === 0
            ) {
              day = "Monday";
            } else {
              day = null;
            }

            newArray.push({
              Day: day,
              Temperature: data[i].Temperature,
              Humidity: data[i].Humidity
            });
          }

          localStorage.setItem("monthGraph", JSON.stringify(newArray));
        } catch {
          localStorage.setItem("monthGraph", null);
        }
      });
  };

  getYear = () => {
    fetch("/api/bedroomClimate/Yearly")
      .then(response => response.text())
      .then(response => {
        try {
          var data = JSON.parse(response);

          var newArray = [];

          for (var i = 0; i < data.length; i++) {
            let day;

            if (data[i].Timestamp.Hour === 0 && data[i].Timestamp.Day === 0) {
              day = data[i].Timestamp.Months;
            } else {
              day = null;
            }

            newArray.push({
              Day: day,
              Temperature: data[i].Temperature,
              Humidity: data[i].Humidity
            });
          }

          localStorage.setItem("yearGraph", JSON.stringify(newArray));
        } catch {}
      });
  };

  ////////////////////////
  render() {
    return null;
  }
}

export default SystemDataCollector;
