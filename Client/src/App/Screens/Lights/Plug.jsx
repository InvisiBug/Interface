// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Buttons
import OnButton from "../../Common Modules/On Button";
import OffButton from "../../Common Modules/Off Button";

class PlugButtonSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      plug: null,
      titleColour: "white"
    };
  }

  componentWillMount = () => this.getPlug();
  componentDidMount = () =>
    (this.timer1 = setInterval(() => {
      this.getPlug();
    }, 100));
  componentWillUnmount = () => clearInterval(this.timer1);

  getPlug = () => {
    var cache = JSON.parse(localStorage.getItem("Plug"));
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

  plugOff = () => {
    clearInterval(this.timer1);
    setTimeout(() => {
      this.timer1 = setInterval(() => {
        this.getPlug();
      }, 100);
    }, 1000);

    this.setState({ activeIndex: 0 });

    var cache = JSON.parse(localStorage.getItem("Plug"));
    cache.state = false;
    localStorage.setItem("Plug", JSON.stringify(cache));

    fetch("/api/Plug/Off");
  };

  plugOn = () => {
    clearInterval(this.timer1);
    setTimeout(() => {
      this.timer1 = setInterval(() => {
        this.getPlug();
      }, 100);
    }, 1000);

    this.setState({ activeIndex: 1 });

    var cache = JSON.parse(localStorage.getItem("Plug"));
    cache.state = true;
    localStorage.setItem("Plug", JSON.stringify(cache));

    fetch("/api/Plug/On");
  };

  render() {
    return (
      <Container className="plug">
        <h3 className="plugTitle" style={{ color: this.state.titleColour }}>
          Floodlight
        </h3>

        <div className="plugButtons">
          <Row>
            <Col md={6}>
              <OffButton
                name="Off"
                index={0}
                isActive={this.state.activeIndex === 0}
                onClick={() => this.plugOff()}
              />
            </Col>

            <Col md={6}>
              <OnButton
                name="On"
                index={1}
                isActive={this.state.activeIndex === 1}
                onClick={() => this.plugOn()}
              />
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default PlugButtonSelection;
