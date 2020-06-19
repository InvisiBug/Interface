import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  kitchenValuesContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    height: "7.5%",
    width: "150px",
    top: "40%",
    left: "19%",

    borderRadius: "20px",

    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(50, 50, 50, 0.2)",
    color: "white",
    fontFamily: "Arial",
    fontSize: "20px",

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

const KitchenHeatingSensor = ({ showGraph }) => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Kitchen Heating Sensor")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Kitchen Heating Sensor")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <div className={css(styles.kitchenValuesContainer)} onClick={() => showGraph("Kitchen")}>
      <p className={css(styles.tempText)}>{deviceData.temperature}°C</p>
      <p className={css(styles.humidityText)}>{deviceData.humidity}%</p>
    </div>
  );
};

export default KitchenHeatingSensor;
