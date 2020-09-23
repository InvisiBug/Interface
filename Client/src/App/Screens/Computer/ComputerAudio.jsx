import React, { useState, useEffect } from "react";

// Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Buttons
import OnButton from "../../Helpers/On Button";
import OffButton from "../../Helpers/Off Button";

const ComputerAudio = () => {
  const [deviceData, setDeviceData] = useState(JSON.parse(localStorage.getItem("Computer Audio")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeviceData(JSON.parse(localStorage.getItem("New Computer Audio")));
    }, 100);
    return () => clearTimeout(timer);
  }, [deviceData]);

  return (
    <>
      <Container className="computerAudioModule" style={{ left: "20%", top: "55%" }}>
        <h3 className="computerAudioTitle" style={{ color: "white" }}>
          Computer Audio
        </h3>

        <div className="computerAudioMasterContainer">
          <Row style={{ height: "65px" }}>
            <Col
              md={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "Center"
              }}
            >
              <h4> Master Power </h4>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OffButton name="Off" index={0} isActive={false} onClick={() => this.powerOff("Master")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={false} onClick={() => this.powerOn("Master")} />
            </Col>
          </Row>

          <Row style={{ height: "65px" }}>
            <Col
              md={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "Center"
              }}
            >
              <h5> Left Speaker </h5>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OffButton name="Off" index={0} isActive={!deviceData.left} onClick={() => this.powerOff("Left")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={deviceData.left} onClick={() => this.powerOn("Left")} />
            </Col>
          </Row>

          <Row style={{ height: "65px" }}>
            <Col
              md={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "Center"
              }}
            >
              <h5> Right Speaker </h5>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OffButton name="Off" index={0} isActive={!deviceData.right} onClick={() => this.powerOff("Right")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={deviceData.right} onClick={() => this.powerOn("Right")} />
            </Col>
          </Row>

          <Row style={{ height: "65px" }}>
            <Col
              md={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "Center"
              }}
            >
              <h5> Sub </h5>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OffButton name="Off" index={0} isActive={!deviceData.sub} onClick={() => this.powerOff("Sub")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={deviceData.sub} onClick={() => this.powerOn("Sub")} />
            </Col>
          </Row>

          <Row style={{ height: "65px" }}>
            <Col
              md={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "Center"
              }}
            >
              <h5> Mixer </h5>
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OffButton name="Off" index={0} isActive={!deviceData.mixer} onClick={() => this.powerOff("Mixer")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={deviceData.mixer} onClick={() => this.powerOn("Mixer")} />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default ComputerAudio;
