import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  valuesContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    height: "45px",
    width: "110px",
    top: "36%",
    left: "49.5%",

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

const StudyHeatingSensor = ({ showGraph }) => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Study Heating Sensor")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Study Heating Sensor")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <div style={{ color: deviceData.isConnected ? "white" : "orangeRed" }} className={css(styles.valuesContainer)} onClick={() => showGraph("Study")}>
      <p className={css(styles.tempText)}>{deviceData.temperature}°C</p>
      <p className={css(styles.humidityText)}>{deviceData.humidity}%</p>
    </div>
  );
};

export default StudyHeatingSensor;
