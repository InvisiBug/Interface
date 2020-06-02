// Components
import React from "react";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import OnButton from "../../Common Modules/On Button";
import OffButton from "../../Common Modules/Off Button";

class ComputerPower extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      computerPower: null,
      titleColour: "white"
    };
  }

  componentWillMount = () => this.getComputerPower();
  componentDidMount = () =>
    (this.timer1 = setInterval(() => {
      this.getComputerPower();
    }, 1000));
  componentWillUnmount = () => clearInterval(this.timer1);

  getComputerPower = () => {
    var cache = JSON.parse(localStorage.getItem("Computer Power"));
    try {
      cache.state
        ? this.setState({ activeIndex: 1 })
        : this.setState({ activeIndex: 0 });

      this.setState({ titleColour: "white" });
      this.setState({ plug: cache.state });
    } catch (error) {
      this.setState({ titleColour: "orangered" });
    }
  };

  powerOn = () => {
    clearInterval(this.timer1);
    this.timer1 = setInterval(() => {
      this.getComputerPower();
    }, 5000);

    this.setState({ activeIndex: 1 });

    fetch("/api/ComputerPower/On");
  };

  powerOff = () => {
    clearInterval(this.timer1);
    this.timer1 = setInterval(() => {
      this.getComputerPower();
    }, 5000);

    this.setState({ activeIndex: 0 });

    fetch("/api/ComputerPower/Off");
  };

  render() {
    return (
      <div className="computerPowerModule">
        <h3
          className="computerPowerTitle"
          style={{ color: this.state.titleColour }}
        >
          Computer Power
        </h3>

        <div className="computerPowerButtonsContainer">
          <Row>
            <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
              <OffButton
                name="Off"
                index={0}
                isActive={this.state.activeIndex === 0}
                onClick={() => this.powerOff()}
              />
            </Col>

            <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
              <OnButton
                name="On"
                index={1}
                isActive={this.state.activeIndex === 1}
                onClick={() => this.powerOn()}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ComputerPower;
