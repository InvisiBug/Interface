import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { localStorageParser } from "../../Helpers/localStorageDriver";
import { camelRoomName } from "../Helpers/Functions";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    height: "45px",
    width: "110px",

    borderRadius: "20px",

    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(50, 50, 50, 0.2)",
    fontFamily: "Arial",
    fontSize: "15px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  tempText: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "25%"
  },
  humidityText: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "78%"
  }
});

const HeatingSensor = ({ showGraph, pos, datapoint }) => {
  const [deviceData, setDeviceData] = useState(localStorageParser(`Environmental Data`).heatingSensors[camelRoomName(datapoint)]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(localStorageParser(`Environmental Data`).heatingSensors[camelRoomName(datapoint)]);
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
      className={css(styles.container)}
      onClick={() => showGraph(datapoint)}
    >
      <p className={css(styles.tempText)}>{deviceData.temperature}°C</p>
      <p className={css(styles.humidityText)}>{deviceData.humidity}%</p>
    </div>
  );
};

export default HeatingSensor;