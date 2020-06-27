// Components
import React, { useEffect, useState } from "react";

// Boostrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Buttons
// import OnButton from "../../Common Modules/On Button";
// import OffButton from "../../Common Modules/Off Button";

import OnButton from "./../../Controls/OnButton";
import OffButton from "./../../Controls/OffButton";

// class PlugButtonSelection extends React.Component {

const Floodlight = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Floodlight")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("Floodlight")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <div className="plug">
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
