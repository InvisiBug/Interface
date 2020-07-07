/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import Auto from "../../Common Modules/On Button";
// import Manual from "../../Common Modules/Off Button";

import Auto from "../../Controls/AutoButton";
import Manual from "../../Controls/ManualButton";

import On from "../../Controls/OnButton";
import Off from "../../Controls/OffButton";

const container = css`
  position: absolute;
  transform: translateX(-50%);
  height: 175px;
  width: 300px;
  top: 15%;
  left: 35%;

  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.1);
  /* background: red; */
  color: white;
  font-family: "Arial";
  font-size: 25px;
  white-space: nowrap;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const title = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 25px;
  left: 50%;
`;

const operationMode = css`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 75%;
  top: 70px;
  left: 50%;
`;

const manualLocked = css`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 75%;
  top: 130px;
  left: 50%;
  opacity: 0.1;
`;

const manualUnlocked = css`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 75%;
  top: 130px;
  left: 50%;
`;

const RadiatorFan = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Radiator Fan")));

  useEffect(() => {
    const timer = setInterval(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Radiator Fan")));
    }, 100);
    return () => clearInterval(timer);
  }, [deviceData]);

  var style;
  deviceData.isAutomatic ? (style = manualLocked) : (style = manualUnlocked);

  return (
    <div css={container}>
      <h3 css={title} style={{ color: deviceData.isConnected ? "white" : "orangeRed" }}>
        Radiator Fan
      </h3>

      <div css={operationMode}>
        <Row>
          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <Manual isActive={!deviceData.isAutomatic} handleClick={() => fetch("/api/RadiatorFanAutomatic/Off")} />
          </Col>

          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <Auto isActive={deviceData.isAutomatic} handleClick={() => fetch("/api/RadiatorFanAutomatic/On")} />
          </Col>
        </Row>
      </div>

      <div css={style}>
        <Row>
          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <Off isActive={!deviceData.isOn} handleClick={() => fetch("/api/RadiatorFan/Off")} />
          </Col>

          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <On isActive={deviceData.isOn} handleClick={() => fetch("/api/RadiatorFan/On")} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RadiatorFan;
