// Components
import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";

// Boostrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Buttons
// import OnButton from "../../Common Modules/On Button";
// import OffButton from "../../Common Modules/Off Button";

import OnButton from "../../Controls/OnButton";
import OffButton from "../../Controls/OffButton";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    height: "100px",
    width: "300px",
    top: "20%",
    left: "50%",

    borderRadius: "20px",

    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(50, 50, 50, 0.1)",
    color: "white",
    fontFamily: "Arial",
    fontSize: "25px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  }
});

const Floodlight = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Floodlight")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Floodlight")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <div className={css(styles.container)}>
      <h3 className="plugTitle" style={{ color: deviceData.isConnected ? "white" : "orangeRed" }}>
        Floodlight
      </h3>

      <div className="plugButtons">
        <Row>
          <Col md={6}>
            <OffButton name="Off" index={0} isActive={!deviceData.isOn} handleClick={() => fetch("/api/Plug/Off")} />
          </Col>

          <Col md={6}>
            <OnButton name="On" index={1} isActive={deviceData.isOn} handleClick={() => fetch("/api/Plug/On")} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Floodlight;
