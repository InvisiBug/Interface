// Components
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slider from "../Common/Sliders/Slider";

class Individual extends React.Component {
  render() {
    return this.props.data[0] ? ( // Sunday is the last one to update (Async)
      <div className="sliderContainer">
        <Row className="scheduleScreenSliders">
          <Col md={{ span: 1, offset: 0 }} className="dateCol">
            <p className="dayText">Mon</p>
          </Col>

          <Col>
            <Slider enabled={this.props.enable} vals={this.props.data[0]} day={"monday"} change={this.props.set} />
          </Col>
        </Row>

        <Row className="scheduleScreenSliders">
          <Col md={{ span: 1, offset: 0 }} className="dateCol">
            <p className="dayText">Tue</p>
          </Col>

          <Col>
            <Slider enabled={this.props.enable} vals={this.props.data[1]} day={"tuesday"} change={this.props.set} />
          </Col>
        </Row>

        <Row className="scheduleScreenSliders">
          <Col md={{ span: 1, offset: 0 }} className="dateCol">
            <p className="dayText">Wed</p>
          </Col>

          <Col>
            <Slider enabled={this.props.enable} vals={this.props.data[2]} day={"wednesday"} change={this.props.set} />
          </Col>
        </Row>

        <Row className="scheduleScreenSliders">
          <Col md={{ span: 1, offset: 0 }} className="dateCol">
            <p className="dayText">Thu</p>
          </Col>

          <Col>
            <Slider enabled={this.props.enable} vals={this.props.data[3]} day={"thursday"} change={this.props.set} />
          </Col>
        </Row>

        <Row className="scheduleScreenSliders">
          <Col md={{ span: 1, offset: 0 }} className="dateCol">
            <p className="dayText">Fri</p>
          </Col>

          <Col>
            <Slider enabled={this.props.enable} vals={this.props.data[4]} day={"friday"} change={this.props.set} />
          </Col>
        </Row>

        <Row className="scheduleScreenSliders">
          <Col md={{ span: 1, offset: 0 }} className="dateCol">
            <p className="dayText">Sat</p>
          </Col>

          <Col>
            <Slider enabled={this.props.enable} vals={this.props.data[5]} day={"saturday"} change={this.props.set} />
          </Col>
        </Row>

        <Row className="scheduleScreenSliders">
          <Col md={{ span: 1, offset: 0 }} className="dateCol">
            <p className="dayText">Sun</p>
          </Col>

          <Col>
            <Slider enabled={this.props.enable} vals={this.props.data[6]} day={"sunday"} change={this.props.set} />
          </Col>
        </Row>
      </div>
    ) : (
      <h2>Loading Schedule...</h2>
    );
  }
}

export default Individual;
