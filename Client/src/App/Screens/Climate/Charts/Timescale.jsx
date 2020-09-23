// Components
import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Buttons
import TimeScaleButtons from "../../../Helpers/Button";

class Timescale extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="timescaleButtonsContainer">
        <Row>
          <Col md={3} style={{ display: "flex", justifyContent: "center" }}>
            <TimeScaleButtons name="Day" isActive={this.props.currentTimeScale === "Day"} onClick={() => this.props.changeTimeScale("Day")} />
          </Col>

          <Col md={3} style={{ display: "flex", justifyContent: "center" }}>
            <TimeScaleButtons name="Week" isActive={this.props.currentTimeScale === "Week"} onClick={() => this.props.changeTimeScale("Week")} />
          </Col>

          <Col md={3} style={{ display: "flex", justifyContent: "center" }}>
            <TimeScaleButtons name="Month" isActive={this.props.currentTimeScale === "Month"} onClick={() => this.props.changeTimeScale("Month")} />
          </Col>

          <Col md={3} style={{ display: "flex", justifyContent: "center" }}>
            <TimeScaleButtons name="Year" isActive={this.props.currentTimeScale === "Year"} onClick={() => this.props.changeTimeScale("Year")} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Timescale;
