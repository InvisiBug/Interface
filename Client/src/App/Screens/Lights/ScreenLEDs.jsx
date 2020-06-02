// Components
import React from "react";
import Container from "react-bootstrap/Container";

import ColourWheel from "./Screen LEDs/Colour Wheel";
import AmbientButton from "./Screen LEDs/Ambient Button";
import RainbowButton from "./Screen LEDs/Rainbow Button";
import FadeButton from "./Screen LEDs/Fade Button";

class ScreenLEDs extends React.Component {
  constructor() {
    super();

    this.state = {
      titleColour: "white"
    };
  }

  componentWillMount = () => this.getScreenLEDs();
  componentDidMount = () =>
    (this.interval = setInterval(() => {
      this.getScreenLEDs();
    }, 100));

  getScreenLEDs = () => {
    var cache = JSON.parse(localStorage.getItem("Screen LEDs"));
    try {
      var test = cache.test;
      this.setState({ titleColour: "white" });
    } catch (error) {
      this.setState({ titleColour: "orangered" });
    }
  };

  render() {
    return (
      <Container className="screenLEDsModule">
        <div className="screenLEDsTitle">
          <h2 style={{ color: this.state.titleColour }}>Screen LEDs</h2>
        </div>

        <ColourWheel />
        <AmbientButton />
        <RainbowButton />
        <FadeButton />
      </Container>
    );
  }
}

export default ScreenLEDs;
