// Components
import React from "react";

// Modules
import Day from "./Charts/Day";
import Week from "./Charts/Week";
import Month from "./Charts/Month";
import Year from "./Charts/Year";

import TimescaleSelection from "./Charts/Timescale";
import Rooms from "./Rooms.jsx";
import SensorInfo from "./SensorInfo.jsx";

class Climate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ourRoomGraphs: false,
      timescale: null,
      blurFactor: "blur(0px)"
    };
  }
  componentWillMount = () => {
    this.setState({ timescale: JSON.parse(localStorage.getItem("timescale")) });
  };

  showGraph = room => {
    this.setState({ ourRoomGraphs: !this.state.ourRoomGraphs });
    this.setState({ blurFactor: "blur(20px)" });
    this.setState({ room: room });
  };

  closeGraph = () => {
    this.setState({ ourRoomGraphs: !this.state.ourRoomGraphs });
    this.setState({ blurFactor: "blur(0px)" });
  };

  changeTimeScale = newTimeScale => {
    this.setState({ timescale: newTimeScale });
    localStorage.setItem("timescale", '"' + newTimeScale + '"');
  };

  render() {
    return (
      <div>
        <Rooms blurFactor={this.state.blurFactor} showGraph={this.showGraph} />

        {this.state.ourRoomGraphs ? (
          this.state.timescale === "Day" ? (
            <Day room={this.state.room} closeGraph={this.closeGraph} />
          ) : this.state.timescale === "Week" ? (
            <Week room={this.state.room} closeGraph={this.closeGraph} />
          ) : this.state.timescale === "Month" ? (
            <Month room={this.state.room} closeGraph={this.closeGraph} />
          ) : this.state.timescale === "Year" ? (
            <Year room={this.state.room} closeGraph={this.closeGraph} />
          ) : null
        ) : null}

        {this.state.ourRoomGraphs ? <TimescaleSelection changeTimeScale={this.changeTimeScale} currentTimeScale={this.state.timescale} /> : null}

        {this.state.ourRoomGraphs ? <SensorInfo room={this.state.room} /> : null}
      </div>
    );
  }
}

export default Climate;
