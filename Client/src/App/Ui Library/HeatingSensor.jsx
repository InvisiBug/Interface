/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import { localStorageParser } from "../../Helpers/localStorageDriver";
import { camelRoomName } from "../Helpers/Functions";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 45px;
  width: 110px;

  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.2);
  font-family: Arial;
  font-size: 15px;
  /* cursor: pointer; */
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const tempText = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 25;
`;

const humidityText = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 78%;
`;

const dataGrabber = datapoint => {
  if (datapoint === "Outside") {
    try {
      return localStorageParser(`Environmental Data`).outside.current;
    } catch {
      return "noData";
    }
  } else {
    try {
      return localStorageParser(`Environmental Data`).heatingSensors[camelRoomName(datapoint)];
    } catch {
      return "noData";
    }
  }
};

const HeatingSensor = ({ showGraph, pos, datapoint }) => {
  const [deviceData, setDeviceData] = useState(dataGrabber(datapoint));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(dataGrabber(datapoint));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData, datapoint]);

  return (
    <div
      style={{
        color: deviceData.isConnected ? "white" : "orangeRed",
        top: `${pos[0]}%`,
        left: `${pos[1]}%`
      }}
      css={container}
      onClick={() => console.log("Clicked")}
    >
      <p css={tempText}>{deviceData.temperature || "Nan"}°C</p>
      <p css={humidityText}>{deviceData.humidity || "Nan"}%</p>
    </div>
  );
};

export default HeatingSensor;
