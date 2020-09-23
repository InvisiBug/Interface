// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Button from "../../../Helpers/Button";

class AmbientButton extends React.Component {
  constructor() {
    super();

    this.state = {
      titleColour: "white",
      mode: null
    };
  }

  componentWillMount = () => this.getMode();
  componentDidMount = () =>
    (this.timer1 = setInterval(() => {
      this.getMode();
    }, 100 /* 1 * 1000 */));
  componentWillUnmount = () => clearInterval(this.timer1);

  getMode = () => {
    var cache = JSON.parse(localStorage.getItem("Screen LEDs"));
    try {
      this.setState({ mode: cache.mode });
      this.setState({ titleColour: "white" });
    } catch (error) {
      this.setState({ titleColour: "orangered" });
    }
  };

  ambient = () => {
    if (this.state.mode == 0 || this.state.mode == 2 || this.state.mode == 3) {
      this.setState({ mode: 1 });
      fetch("/api/screenLEDs/ambient/on");

      var cache = JSON.parse(localStorage.getItem("Screen LEDs"));
      cache.mode = 1;
      localStorage.setItem("Screen LEDs", JSON.stringify(cache));
    } else if (this.state.mode == 1) {
      this.setState({ mode: 0 });
      fetch("/api/screenLEDs/colour");

      var cache = JSON.parse(localStorage.getItem("Screen LEDs"));
      cache.mode = 0;
      localStorage.setItem("Screen LEDs", JSON.stringify(cache));
    }
  };

  render() {
    return (
      <div className="ambientButton">
        <Button name="Ambient" index={0} isActive={this.state.mode === 1} onClick={() => this.ambient()} />
      </div>
    );
  }
}

export default AmbientButton;
