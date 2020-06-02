// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Buttons
import OnOffButtons from "../../Common Modules/Button";

class AutoActivate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      computerPower: null
    };
  }

  componentWillMount = () => {
    this.getAutoActivateStatus();
  };

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.getAutoActivateStatus();
    }, 2 * 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  getAutoActivateStatus = () => {
    fetch("/api/autoActivate/status")
      .then(response => response.text())
      .then(response => {
        try {
          var resJSON = JSON.parse(response);

          this.setState({ autoActivate: resJSON });
          this.state.autoActivate
            ? this.setState({ activeIndex: 1 })
            : this.setState({ activeIndex: 0 });
        } catch {
          // No data present, fill with zeros
          this.setState({ autoActivate: false });
          this.state.autoActivate
            ? this.setState({ activeIndex: 1 })
            : this.setState({ activeIndex: 0 });
        }
      });
  };

  powerOn = () => {
    this.setState({ activeIndex: 1 });
    fetch("/api/autoActivate/on", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        State: true
      })
    });
  };

  powerOff = () => {
    this.setState({ activeIndex: 0 });
    fetch("/api/autoActivate/off", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        State: false
      })
    });
  };

  render() {
    return (
      <div className="autoActivateModule">
        <h3 className="autoActivateTitle">Auto Activate</h3>

        <div className="autoActivateContainer">
          <Row>
            <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
              <OnOffButtons
                name="Off"
                index={0}
                isActive={this.state.activeIndex === 0}
                onClick={() => this.powerOff()}
              />
            </Col>

            <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
              <OnOffButtons
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

export default AutoActivate;
