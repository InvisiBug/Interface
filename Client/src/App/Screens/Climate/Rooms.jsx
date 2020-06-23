// Components
import React from "react";

import HeatingSensor from "./HeatingSensor.jsx";
// import OutsideSetpoint from "./OutsideSetpoint.jsx";

// import OurRoomHeatingController  from '../../../Devices/Our Room/Our Room Heating Controller.jsx';

import FloorPlanPicture from "./Floor Plan.png";

const rooms = [
  {
    name: "Living Room",
    top: 72,
    left: 20.5
  },
  {
    name: "Kitchen",
    top: 36,
    left: 19
  },
  {
    name: "Liams Room",
    top: 72,
    left: 51
  },
  {
    name: "Study",
    top: 36,
    left: 49.5
  },
  {
    name: "Our Room",
    top: 55,
    left: 86
  },
  {
    name: "Outside",
    top: 10,
    left: 86
  }
];

class FirstFloor extends React.Component {
  render() {
    return (
      <div style={{ filter: this.props.blurFactor }} className="floorPlanPictureContainer">
        <img src={FloorPlanPicture} alt="floorplanPic" className="floorPlanPicture" />

        {rooms.map(room => (
          <HeatingSensor datapoint={room.name} top={room.top} left={room.left} key={room.name} showGraph={this.props.showGraph} />
        ))}

        {/* <OutsideSetpoint /> */}
      </div>
    );
  }
}

export default FirstFloor;
