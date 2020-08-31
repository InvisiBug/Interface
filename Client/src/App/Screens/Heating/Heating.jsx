// Components
import React from "react";

import Individual from "./Individual";
import OnOff from "./On Off";
import { jsx, css } from "@emotion/core";
import Boost from "./Boost";
import ActiveIndicator from "./ActiveIndicator";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 1100px;
  top: 60%;
  left: 50%;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.1);
  border-radius: 20px;
  color: white;
  font-family: "Arial";
  font-size: 20px;

  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      enable: null
    };
  }

  // componentWillMount = () => this.getHeatingSchedule();
  // componentDidMount = () =>
  //   (this.timer1 = setInterval(() => {
  //     this.getEnable();
  //   }, 100));
  // componentWillUnmount = () => clearInterval(this.timer1);

  // getHeatingSchedule = () => {
  //   var cache = JSON.parse(localStorage.getItem("heatingSchedule"));
  //   try {
  //     // this.setState({ enable: cache.enable });
  //     var newArray = [];

  //     newArray[0] = cache.monday; // *NB* Figure out how to make the array indexes the day of the week
  //     newArray[1] = cache.tuesday;
  //     newArray[2] = cache.wednesday;
  //     newArray[3] = cache.thursday;
  //     newArray[4] = cache.friday;
  //     newArray[5] = cache.saturday;
  //     newArray[6] = cache.sunday;

  //     this.setState({ data: [] });

  //     this.setState({ data: [...this.state.data, ...newArray] });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // getEnable = () => {
  //   var cache = JSON.parse(localStorage.getItem("heatingSchedule"));
  //   try {
  //     this.setState({ enable: cache.enable });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // set = newVals => {
  //   var cache = JSON.parse(localStorage.getItem("heatingSchedule"));
  //   cache[newVals.day] = newVals.values;
  //   localStorage.setItem("heatingSchedule", JSON.stringify(cache));

  //   // fetch("/api/heating/schedule/update",
  //   fetch("/api/ci/schedule/update", {
  //     headers: { "Content-Type": "application/json" },
  //     method: "POST",
  //     body: JSON.stringify({
  //       vals: cache
  //     })
  //   });
  //   console.log("Changed");
  // };

  wait = () => {
    //     console.log("Clicked")
    //     clearInterval(this.timer1);
    //
    //     setTimeout(() =>
    //     {
    //       this.interval = setInterval(() => { this.getHeatingSchedule()}, 5 * 1000);
    //     }, 5 * 1000)
  };

  render() {
    return (
      <>
        <Boost />
        {/* <OnOff /> */}
        {/* <Boost /> */}
        <ActiveIndicator />
        {/* <div css="container">
          <div className="scheduleModule">
            <h1 className="scheduleTitle">Schedule</h1>
            <Individual data={this.state.data} enable={this.state.enable} set={this.set} />
          </div>
        </div> */}
      </>
    );
  }
}

export default Schedule;

//<div className="scheduleModule" onClick={() => this.wait()}>
//          {/* Add on off here */}
//          <h1 className="scheduleTitle">Schedule</h1>
//          <Individual data={this.state.data} enable={this.state.enable} set={this.set} />
//        </div>
