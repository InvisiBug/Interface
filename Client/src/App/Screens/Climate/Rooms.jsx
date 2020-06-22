// Components
import React from "react";

import HeatingSensor from "./HeatingSensor.jsx";
import OutsideSetpoint from "./OutsideSetpoint.jsx";

// import OurRoomHeatingController  from '../../../Devices/Our Room/Our Room Heating Controller.jsx';

import FloorPlanPicture from "./Floor Plan.png";

class FirstFloor extends React.Component {
  render() {
    return (
      <div style={{ filter: this.props.blurFactor }} className="floorPlanPictureContainer">
        <img src={FloorPlanPicture} alt="floorplanPic" className="floorPlanPicture" />

        <HeatingSensor datapoint={"Living Room"} top={72} left={20.5} showGraph={this.props.showGraph} />
        <HeatingSensor datapoint={"Kitchen"} top={36} left={19} showGraph={this.props.showGraph} />
        <HeatingSensor datapoint={"Liams Room"} top={72} left={51} showGraph={this.props.showGraph} />
        <HeatingSensor datapoint={"Study"} top={36} left={49.5} showGraph={this.props.showGraph} />
        <HeatingSensor datapoint={"Our Room"} top={55} left={86} showGraph={this.props.showGraph} />

        {/* <OutsideSensor /> */}
        <HeatingSensor datapoint={"Outside"} top={10} left={86} showGraph={this.props.showGraph} />

        {/* <OutsideSetpoint /> */}
      </div>
    );
  }
}

export default FirstFloor;
