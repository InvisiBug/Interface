// Components
import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Auto from "../../Common Modules/On Button";
import Manual from "../../Common Modules/Off Button";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    transform: "translateX(-50%)",
    height: "175px",
    width: "300px",
    top: "15%",
    left: "35%",

    borderRadius: "20px",

    // border: "1px solid rgba(255, 255, 255, 0.2)",
    border: "1px solid red",
    background: "rgba(50, 50, 50, 0.1)",
    color: "white",
    fontFamily: "Arial",
    fontSize: "25px",
    whiteSpace: "nowrap",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  }
});

const RadiatorFan = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Radiator Fan")));

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setDeviceData(JSON.parse(localStorage.getItem("Radiator Fan")));
    //   console.log("Here");
    // }, 100);

    const timer = setInterval(() => {
      console.log("Here");
      setDeviceData(JSON.parse(localStorage.getItem("Radiator Fan")));
    }, 100);
    return () => clearInterval(timer);
  }, [deviceData]);

  return (
    // <div className="radiatorFanModule">
    <div className={css(styles.container)}>
      <h3 className="radiatorFanTitle" style={{ color: deviceData.isConnected ? "white" : "orangeRed" }}>
        Radiator Fan
      </h3>

      <div className="radiatorFanAutoManualButtonsContainer">
        <Row>
          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <Manual name="Manual" isActive={!deviceData.isAutomatic} onClick={() => fetch("/api/RadiatorFanAutomatic/Off")} />
          </Col>

          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <Auto name="Auto" isActive={deviceData.isAutomatic} onClick={() => fetch("/api/RadiatorFanAutomatic/On")} />
          </Col>
        </Row>
      </div>

      <div className={!deviceData.isAutomatic ? "radiatorFanManualControlsActive" : "radiatorFanManualControlsLocked"}>
        <Row>
          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <Manual name="Off" isActive={!deviceData.isOn} onClick={() => fetch("/api/RadiatorFan/Off")} />
          </Col>

          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <Auto name="On" isActive={deviceData.isOn} onClick={() => fetch("/api/RadiatorFan/On")} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RadiatorFan;
