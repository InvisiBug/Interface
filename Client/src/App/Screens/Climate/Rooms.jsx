/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import HeatingSensor from "../../Ui Library/HeatingSensor";
import FloorPlanPicture from "./Floor Plan.png";

const floorPlanPictureContainer = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 700px;
  width: 1100px;
  top: 50%;
  left: 50%;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  background: rgba(50, 50, 50, 0.1);
  color: white;
  font-family: "Arial";
  font-size: 25px;
`;

const floorPlanPicture = css`
  position: absolute;
  transform: translate(-50%, -50%);
  filter: invert(100%);
  top: 50%;
  left: 50%;
`;

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
  {
    name: "Outside",
    pos: [10, 86]
  }
];

const FirstFloor = (blurFactor, showGraph) => {
  return (
    <div style={{ filter: blurFactor }} css={floorPlanPictureContainer}>
      <img src={FloorPlanPicture} alt="floorplanPic" css={floorPlanPicture} />

      {rooms.map(room => (
        <HeatingSensor datapoint={room.name} key={room.name} pos={room.pos} showGraph={showGraph} />
      ))}
    </div>
  );
};

export default FirstFloor;
