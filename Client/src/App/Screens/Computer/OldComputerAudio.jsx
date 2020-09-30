// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Buttons
import OnButton from "../../Helpers/On Button";
import OffButton from "../../Helpers/Off Button";

class ComputerPower extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      masterActiveIndex: 0,
      leftActiveIndex: 0,
      rightActiveIndex: 0,
      subActiveIndex: 0,
      mixerActiveIndex: 0,
      computerAudio: null,
      titleColour: "white"
    };
  }

  componentWillMount = () => {
    this.getComputerAudio();
    this.calculateMasterPower();
  };

  componentDidMount = () => {
    this.timer1 = setInterval(() => {
      this.getComputerAudio();
    }, 1 * 1000);
    this.timer2 = setInterval(() => {
      this.calculateMasterPower();
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  };

  calculateMasterPower = () => {
    var cache = JSON.parse(localStorage.getItem("Computer Audio"));
    try {
      if (cache.Left && cache.Right && cache.Sub && cache.Mixer) {
        this.setState({ masterActiveIndex: 1 });
      } else {
        this.setState({ masterActiveIndex: 0 });
      }
    } catch {}
  };

  getComputerAudio = () => {
    var cache = JSON.parse(localStorage.getItem("Computer Audio"));
    try {
      this.setState({ titleColour: "white" });

      this.setState({ computerAudio: cache.state });

      cache.Left ? this.setState({ leftActiveIndex: 1 }) : this.setState({ leftActiveIndex: 0 });
      cache.Right ? this.setState({ rightActiveIndex: 1 }) : this.setState({ rightActiveIndex: 0 });
      cache.Sub ? this.setState({ subActiveIndex: 1 }) : this.setState({ subActiveIndex: 0 });
      cache.Mixer ? this.setState({ mixerActiveIndex: 1 }) : this.setState({ mixerActiveIndex: 0 });
    } catch {
      // No data present, fill with zeros
      this.setState({ leftActiveIndex: 0 });
      this.setState({ rightActiveIndex: 0 });
      this.setState({ subActiveIndex: 0 });
      this.setState({ mixerActiveIndex: 0 });
      this.setState({ masterActiveIndex: 0 });
      this.setState({ titleColour: "orangered" });
    }
  };

  powerOn = device => {
    clearInterval(this.timer1);
    this.timer1 = setInterval(() => {
      this.getComputerAudio();
    }, 5000);

    if (device === "Master") this.setState({ masterActiveIndex: 1 });
    else if (device === "Left") this.setState({ leftActiveIndex: 1 });
    else if (device === "Right") this.setState({ rightActiveIndex: 1 });
    else if (device === "Sub") this.setState({ subActiveIndex: 1 });
    else if (device === "Mixer") this.setState({ mixerActiveIndex: 1 });

    fetch("/api/ComputerAudio/On", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        Device: device
      })
    });
  };

  powerOff = device => {
    clearInterval(this.timer1);
    this.timer1 = setInterval(() => {
      this.getComputerAudio();
    }, 5000);

    if (device === "Master") this.setState({ masterActiveIndex: 0 });
    else if (device === "Left") this.setState({ leftActiveIndex: 0 });
    else if (device === "Right") this.setState({ rightActiveIndex: 0 });
    else if (device === "Sub") this.setState({ subActiveIndex: 0 });
    else if (device === "Mixer") this.setState({ mixerActiveIndex: 0 });

    fetch("/api/ComputerAudio/Off", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        Device: device
      })
    });
  };

  render() {
    return (
      <Container className="computerAudioModule">
        <h3 className="computerAudioTitle" style={{ color: this.state.titleColour }}>
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
              <OffButton name="Off" index={0} isActive={this.state.masterActiveIndex === 0} onClick={() => this.powerOff("Master")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={this.state.masterActiveIndex === 1} onClick={() => this.powerOn("Master")} />
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
              <OffButton name="Off" index={0} isActive={this.state.leftActiveIndex === 0} onClick={() => this.powerOff("Left")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={this.state.leftActiveIndex === 1} onClick={() => this.powerOn("Left")} />
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
              <OffButton name="Off" index={0} isActive={this.state.rightActiveIndex === 0} onClick={() => this.powerOff("Right")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={this.state.rightActiveIndex === 1} onClick={() => this.powerOn("Right")} />
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
              <OffButton name="Off" index={0} isActive={this.state.subActiveIndex === 0} onClick={() => this.powerOff("Sub")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={this.state.subActiveIndex === 1} onClick={() => this.powerOn("Sub")} />
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
              <OffButton name="Off" index={0} isActive={this.state.mixerActiveIndex === 0} onClick={() => this.powerOff("Mixer")} />
            </Col>

            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <OnButton name="On" index={1} isActive={this.state.mixerActiveIndex === 1} onClick={() => this.powerOn("Mixer")} />
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default ComputerPower;
