// Components
import React, { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Auto from "../../Common Modules/On Button";
import Manual from "../../Common Modules/Off Button";

const RadiatorFan = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Radiator Fan")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Radiator Fan")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <div className="radiatorFanModule">
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
