// Components
import React from "react";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Auto from "../../Common Modules/On Button";
import Manual from "../../Common Modules/Off Button";

class RadiatorFan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      automatic: false,
      fanActive: false,
      titleColour: "white"
    };
  }

  componentWillMount = () => this.getRadiatorFan();
  componentDidMount = () =>
    (this.timer1 = setInterval(() => {
      this.getRadiatorFan();
    }, 1000));
  componentWillUnmount = () => clearInterval(this.timer1);

  getRadiatorFan = () => {
    var cache = JSON.parse(localStorage.getItem("Radiator Fan"));
    try {
      cache.state ? this.setState({ fanActive: 1 }) : this.setState({ fanActive: 0 });
      cache.automatic ? this.setState({ automatic: 1 }) : this.setState({ automatic: 0 });

      console.log(cache.state);

      this.setState({ titleColour: "white" });
    } catch (error) {
      this.setState({ titleColour: "orangered" });
    }
  };

  // Auto Manual Switching Controls
  auto = () => {
    console.log("Auto Mode");
    this.setState({ automatic: 1 });
    fetch("/api/RadiatorFanAutomatic/On");
  };

  manual = () => {
    console.log("Manual Mode");
    this.setState({ automatic: 0 });
    fetch("/api/RadiatorFanAutomatic/Off");
  };

  // Manual On / Off Controls
  on = () => {
    if (!this.state.automatic) {
      console.log("Enable Fan");
      this.setState({ fanActive: 1 });
      fetch("/api/RadiatorFan/On");
    }
  };

  off = () => {
    if (!this.state.automatic) {
      console.log("Disable Fan");
      this.setState({ fanActive: 0 });
      fetch("/api/RadiatorFan/Off");
    }
  };

  render() {
    return (
      <div className="radiatorFanModule">
        <h3 className="radiatorFanTitle" style={{ color: this.state.titleColour }}>
          Radiator Fan
        </h3>

        <div className="radiatorFanAutoManualButtonsContainer">
          <Row>
            <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
              <Manual name="Manual" isActive={!this.state.automatic} onClick={() => this.manual()} />
            </Col>

            <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
              <Auto name="Auto" isActive={this.state.automatic} onClick={() => this.auto()} />
            </Col>
          </Row>
        </div>

        <div className={!this.state.automatic ? "radiatorFanManualControlsActive" : "radiatorFanManualControlsLocked"}>
          <Row>
            <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
              <Manual name="Off" isActive={!this.state.fanActive} onClick={() => this.off()} />
            </Col>

            <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
              <Auto name="On" isActive={this.state.fanActive} onClick={() => this.on()} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default RadiatorFan;
