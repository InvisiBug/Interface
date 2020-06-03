// Components
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import Cross from "./Close.png";

class Day extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      humidityTicks: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
      temperatureTicks: [0, 5, 10, 15, 20, 25, 30]
    };
  }

  componentWillMount = () => this.getData();

  getData = () => {
    //     var space = this.props.room.indexOf(' ');
    //     var room;
    //
    //     if(space > 0)
    //     {
    //       var first = this.props.room.substring(0, space);
    //       first     = first.toLowerCase();
    //       var last = this.props.room.substring(space + 1, this.props.room.length);
    //       room = first + last;
    //     }
    //
    //     else
    //     {
    //       console.log("here");
    //       room = this.props.room.toLowerCase();
    //     }

    fetch("/api/heating/sensor/historical", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        timescale: "day",
        room: this.props.room
      })
    })
      .then(response => response.text())
      .then(response => {
        try {
          var data = JSON.parse(response);

          var newArray = [];

          for (var i = 0; i < data.length; i++) {
            newArray.push({
              hour: data[i].timestamp.Hour,
              temperature: data[i].temperature,
              humidity: data[i].humidity
            });
          }

          this.setState({ data: newArray });
        } catch (error) {
          console.log(error);
        }
      });
  };

  render() {
    return (
      <div className="graphModule">
        <img src={Cross} alt="" className="closeIcon" onClick={() => this.props.closeGraph()} />
        <p className="temperatureTitle">Temperature (°C)</p>
        <p className="humidityTitle">Humidity (%)</p>
        <p className="xAxisTitle">Time (Hour)</p>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={this.state.data} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2.5" vertical={false} />

            <XAxis tick={{ fill: "white" }} tickSize={0} dataKey="hour" interval={0} stroke="white" />

            <YAxis yAxisId="left" tick={{ fill: "white" }} ticks={this.state.temperatureTicks} domain={[0, 25]} stroke="#a19ee8" />
            <YAxis
              yAxisId="right"
              tick={{ fill: "white" }}
              ticks={this.state.humidityTicks}
              domain={[40, 100]}
              stroke="#82ca9d"
              orientation="right"
            />

            <Line yAxisId="left" isAnimationActive={false} type="monotone" dataKey="temperature" stroke="#a19ee8" strokeWidth={3} dot={false} />
            <Line yAxisId="right" isAnimationActive={false} type="monotone" dataKey="humidity" stroke="#82ca9d" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Day;
