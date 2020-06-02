// Components
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slider from "../Sliders/Slider";
import { withCookies } from "react-cookie";

class All extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;

    this.state = {
      DeviceKey: cookies.get("DeviceKey"),
      password: cookies.get("password")
    };
  }

  componentWillMount() {
    try {
      let monday = JSON.parse(localStorage.getItem("heatingSchedule")).Monday; // Extract monday value from local storage
      this.setState({ all: monday }); // Save it to state

      // Save monday value back over all value
      var temp = JSON.parse(localStorage.getItem("heatingSchedule"));
      temp.all = monday;
      localStorage.setItem("heatingSchedule", JSON.stringify(temp));
    } catch {
      this.getSchedule();
    }
    // get schedule used to be here
  }

  getSchedule() {
    fetch("/api/schedule/get", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        DeviceKey: this.state.DeviceKey,
        password: this.state.password,
        type: "heating"
      })
    })
      .then(response => response.text())
      .then(response => {
        try {
          JSON.parse(response);
          localStorage.setItem("heatingSchedule", response);

          this.setState({
            all: JSON.parse(localStorage.getItem("heatingSchedule")).Monday
          });
        } catch {
          console.log("Data Link Severed");
        }
      });
  }

  updateAll = sliderValue => {
    var cache = JSON.parse(localStorage.getItem("heatingSchedule"));
    cache.all = sliderValue.values;
    localStorage.setItem("heatingSchedule", JSON.stringify(cache));
  };

  render() {
    return this.state.all ? (
      <div className="sliderContainer">
        <Row className="scheduleScreenSliders">
          <Col md={{ span: 1, offset: 0 }} className="dateCol">
            <p className="dayText">All</p>
          </Col>

          <Col>
            <Slider
              disabled={this.props.active}
              vals={this.state.all}
              day={"all"}
              change={this.updateAll}
            />
          </Col>
        </Row>
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  }
}

export default withCookies(All);
