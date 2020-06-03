// Components
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import Cross from "./Close.png";

class Year extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      humidityTicks: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
      temperatureTicks: [0, 5, 10, 15, 20, 25, 30]
    };
  }

  componentWillMount = () => {};

  componentDidMount = () => {
    this.getData();
    this.interval = setInterval(() => {
      this.getData();
    }, 1800 * 1000); // 30 min update cycle
  };

  getData = () => {
    var cache = JSON.parse(localStorage.getItem("yearGraph"));
    try {
      var cache = JSON.parse(localStorage.getItem("yearGraph"));
      this.setState({ data: JSON.parse(localStorage.getItem("yearGraph")) });
    } catch {
      this.setState({ data: null });
    }
  };

  render() {
    return (
      <div className="graphModule">
        <img src={Cross} alt="" className="closeIcon" onClick={() => this.props.closeGraph()} />
        <p className="temperatureTitle">Temperature (°C)</p>
        <p className="humidityTitle">Humidity (%)</p>
        {/* <p className="xAxisTitle">Week</p> */}
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={this.state.data} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2.5" vertical={false} />

            <XAxis tick={{ fill: "white" }} tickSize={0} dataKey="Day" interval={0} stroke="white" />

            <YAxis yAxisId="left" tick={{ fill: "white" }} ticks={this.state.temperatureTicks} domain={[0, 25]} stroke="#a19ee8" />
            <YAxis
              yAxisId="right"
              tick={{ fill: "white" }}
              ticks={this.state.humidityTicks}
              domain={[40, 100]}
              stroke="#82ca9d"
              orientation="right"
            />

            <Line yAxisId="left" type="monotone" isAnimationActive={false} dataKey="Temperature" stroke="#a19ee8" strokeWidth={3} dot={false} />
            <Line yAxisId="right" type="monotone" isAnimationActive={false} dataKey="Humidity" stroke="#82ca9d" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Year;
