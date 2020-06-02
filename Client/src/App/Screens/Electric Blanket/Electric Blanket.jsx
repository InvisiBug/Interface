// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Individual from "./Individual";

class ElectricBlanket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      enable: null
    };
  }

  componentWillMount = () => this.getHeatingSchedule();
  // componentDidMount    = () => this.timer1 = setInterval(() => { this.getHeatingSchedule() }, 1 * 1000)
  // componentWillUnmount = () => clearInterval(this.timer1);

  getHeatingSchedule = () => {
    console.log("Checking");
    var cache = JSON.parse(localStorage.getItem("heatingSchedule"));
    try {
      this.setState({ enable: cache.enable });
      var newArray = [];

      newArray[0] = cache.monday; // *NB* Figure out how to make the array indexes the day of the week
      newArray[1] = cache.tuesday;
      newArray[2] = cache.wednesday;
      newArray[3] = cache.thursday;
      newArray[4] = cache.friday;
      newArray[5] = cache.saturday;
      newArray[6] = cache.sunday;

      this.setState({ data: [] });

      this.setState({ data: [...this.state.data, ...newArray] });
    } catch (error) {
      // catch(error) {localStorage.setItem("heatingSchedule", null)}
      console.log(error);
    }
  };

  set = newVals => {
    var cache = JSON.parse(localStorage.getItem("electricBlanketSchedule"));
    cache[newVals.day] = newVals.values;
    localStorage.setItem("electricBlanketSchedule", JSON.stringify(cache));

    fetch("/api/blanket/schedule/update", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        vals: cache
      })
    });

    console.log("Changed");
  };

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
      <div className="scheduleModule" onClick={() => this.wait()}>
        {/* Add on off here */}
        <h1 className="scheduleTitle">Heating</h1>
        <Individual
          data={this.state.data}
          enable={this.state.enable}
          set={this.set}
        />
      </div>
    );
  }
}

export default ElectricBlanket;
