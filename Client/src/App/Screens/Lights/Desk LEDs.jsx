// Components
import React from "react";
import Container from "react-bootstrap/Container";

import ColourWheel from "../../Ui Library/ColourWheel/ColourWheel";

class DeskLEDs extends React.Component {
  constructor() {
    super();

    this.state = {
      titleColour: "white"
    };
  }

  componentWillMount = () => this.getCurrentColour();
  componentDidMount = () =>
    (this.timer1 = setInterval(() => {
      this.getCurrentColour();
    }, 100 /* 1 * 1000 */));
  componentWillUnmount = () => clearInterval(this.timer1);

  getCurrentColour = () => {
    var cache = JSON.parse(localStorage.getItem("Desk LEDs"));
    try {
      this.setState({ titleColour: "white" });
      this.setState({
        colour: "rgb(" + cache.red + ", " + cache.green + ", " + cache.blue + ")"
      });
    } catch (error) {
      this.setState({ titleColour: "orangered" });
      this.setState({ colour: "rgb(" + 0 + ", " + 0 + ", " + 0 + ")" });
    }
  };

  colourUpdate = rgb => {
    var cache = JSON.parse(localStorage.getItem("Desk LEDs"));

    this.setState({ colour: rgb });

    var a = rgb.split("(")[1].split(")")[0];
    a = a.split(",");
    var colours = a.map(function(x) {
      return parseInt(x);
    });

    console.log(colours);

    fetch("/api/deskLEDs/Update", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        Node: "ScreenLeds",
        red: colours[0],
        green: colours[1],
        blue: colours[2]
      })
    });
  };

  render() {
    return (
      <Container className="deskLEDsModule">
        <div className="deskLEDsTitle">
          <h2 style={{ color: this.state.titleColour }}>Desk LEDs</h2>
        </div>

        <div className="deskLEDsColourWheel">
          <ColourWheel
            name={"Canvas 1"}
            radius={125}
            padding={10}
            lineWidth={40}
            onColourSelected={rgb => this.colourUpdate(rgb)}
            spacers={{
              colour: "whitesmoke",
              shadowColour: "grey",
              shadowBlur: 0
            }}
            onRef={ref => (this.colourWheel = ref)}
            preset
            presetColour={this.state.colour}
            animated
          />
        </div>
      </Container>
    );
  }
}

export default DeskLEDs;

// Radius    - Overall Size
// Padding   - White Line Width
// LineWidth - Colour tile thickness
// Middle is drawn behind everything

// All these variables depend on each other so it takes a while to tune
