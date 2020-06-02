// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Buttons
import OnButton from "../../Common Modules/On Button";
import OffButton from "../../Common Modules/Off Button";

class Boost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      computerPower: null,
      titleColour: "white"
    };
  }

  componentWillMount = () => this.getState();
  componentDidMount = () =>
    (this.timer = setInterval(() => {
      this.getState();
    }, 100));
  componentWillUnmount = () => clearInterval(this.timer);

  getState = () => {
    var cache = JSON.parse(localStorage.getItem("Heating Schedule"));
    try {
      cache.boost
        ? this.setState({ activeIndex: 1 })
        : this.setState({ activeIndex: 0 });

      this.setState({ titleColour: "white" });
    } catch (error) {
      this.setState({ titleColour: "orangered" });
    }
  };

  on = () => {
    clearInterval(this.timer);
    setTimeout(() => {
      this.timer = setInterval(() => {
        this.getState();
      }, 100);
    }, 1500);

    this.setState({ activeIndex: 1 });

    var cache = JSON.parse(localStorage.getItem("Heating Schedule"));
    cache.boost = true;
    localStorage.setItem("Heating Schedule", JSON.stringify(cache));

    fetch("/api/heating/boost/update", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        state: true
      })
    });
  };

  off = () => {
    clearInterval(this.timer);
    setTimeout(() => {
      this.timer = setInterval(() => {
        this.getState();
      }, 100);
    }, 1500);

    this.setState({ activeIndex: 0 });

    var cache = JSON.parse(localStorage.getItem("Heating Schedule"));
    cache.boost = false;
    localStorage.setItem("Heating Schedule", JSON.stringify(cache));

    fetch("/api/heating/boost/update", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        state: false
      })
    });
  };

  render() {
    return (
      <div className="heatingBoostModule">
        <h3
          className="heatingBoostTitle"
          style={{ color: this.state.titleColour }}
        >
          Boost
        </h3>

        <div className="heatingBoostButtonsContainer">
          <Row>
            <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
              <OffButton
                name="Off"
                index={0}
                isActive={this.state.activeIndex === 0}
                onClick={() => this.off()}
              />
            </Col>

            <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
              <OnButton
                name="On"
                index={1}
                isActive={this.state.activeIndex === 1}
                onClick={() => this.on()}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Boost;
