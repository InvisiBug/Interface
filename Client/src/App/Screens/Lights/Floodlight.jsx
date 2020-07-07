/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";

// Boostrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import OnButton from "../../Controls/OnButton";
import OffButton from "../../Controls/OffButton";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 100px;
  width: 300px;
  top: 20%;
  left: 50%;

  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.1);
  color: white;
  font-family: Arial;
  font-size: 25px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: cente;
`;

const Floodlight = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Floodlight")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Floodlight")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <div css={container}>
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
