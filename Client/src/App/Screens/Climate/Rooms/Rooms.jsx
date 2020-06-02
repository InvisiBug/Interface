// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Room Sensors
import LivingRoomHeatingSensor from "./Living Room/Living Room Heating Sensor.jsx";
import KitchenHeatingSensor from "./Kitchen/Kitchen Heating Sensor.jsx";
import LiamsRoomHeatingSensor from "./Liams Room/Liams Room Heating Sensor.jsx";
import StudyHeatingSensor from "./Study/Study Heating Sensor.jsx";
import OurRoomHeatingSensor from "./Our Room/Our Room Heating Sensor.jsx";

import OutsideSensor from "./Outside/OutsideSensor.jsx";
import OutsideSetpoint from "./Outside/OutsideSetpoint.jsx";

// import OurRoomHeatingController  from '../../../Devices/Our Room/Our Room Heating Controller.jsx';

import FloorPlanPicture from "./Floor Plan.png";

class FirstFloor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{ filter: this.props.blurFactor }}
        className="floorPlanPictureContainer"
      >
        <img src={FloorPlanPicture} className="floorPlanPicture" />

        {/* <OurRoomHeatingController/> */}
        <OurRoomHeatingSensor showGraph={this.props.showGraph} />
        <LiamsRoomHeatingSensor showGraph={this.props.showGraph} />
        <KitchenHeatingSensor showGraph={this.props.showGraph} />
        <StudyHeatingSensor showGraph={this.props.showGraph} />
        <LivingRoomHeatingSensor showGraph={this.props.showGraph} />

        <OutsideSensor />
        <OutsideSetpoint />
      </div>
    );
  }
}

export default FirstFloor;
