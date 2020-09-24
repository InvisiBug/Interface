// Components
import React from "react";

import HeatingSensor from "./HeatingSensor.jsx";
// import OutsideSetpoint from "./OutsideSetpoint.jsx";

// import OurRoomHeatingController  from '../../../Devices/Our Room/Our Room Heating Controller.jsx';

import FloorPlanPicture from "./Floor Plan.png";

const rooms = [
  {
    name: "Living Room",
    pos: [72, 20.5]
  },
  {
    name: "Kitchen",
    pos: [36, 19]
  },
  {
    name: "Liams Room",
    pos: [72, 51]
  },
  {
    name: "Study",
    pos: [36, 49.5]
  },
  {
    name: "Our Room",
    pos: [55, 86]
  },
  // {
  //   name: "Outside", *NB* Bring this back
  //   pos: [10, 86]
  // }
];

const FirstFloor = (blurFactor, showGraph) => {
  return (
    <div style={{ filter: blurFactor }} className="floorPlanPictureContainer">
      <img
        src={FloorPlanPicture}
        alt="floorplanPic"
        className="floorPlanPicture"
      />

      {rooms.map(room => (
        <HeatingSensor
          datapoint={room.name}
          key={room.name}
          pos={room.pos}
          showGraph={showGraph}
        />
      ))}

      {/* <OutsideSetpoint /> */}
    </div>
  );
};

export default FirstFloor;
