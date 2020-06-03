// Components
import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import Container from "react-bootstrap/Container";
import { HandleStart, Track, Tick, HandleEnd, railStyle, sliderStyle } from "./Slider Components";

class MySlider extends Component {
  constructor(props) {
    super(props);
    // this.updateVals = this.props.change.bind(this);

    this.state = {
      day: this.props.day,
      values: this.props.vals
    };
  }

  update = values => {
    this.setState({ values });
    this.props.change(this.state);
  };

  render() {
    return (
      <Container>
        <div style={{ margin: "0%", width: "100%" }}>
          <Slider
            disabled={!this.props.enabled}
            mode={2}
            step={0.25}
            domain={[0, 24]}
            rootStyle={sliderStyle}
            onChange={this.update}
            values={this.state.values}
          >
            <Rail>{({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}</Rail>

            <Handles>
              {({ handles, getHandleProps }) => (
                <div className="slider-handles">
                  {handles
                    .filter((d, i) => i % 2 !== 0)
                    .map(handle => (
                      <HandleStart key={handle.id} handle={handle} domain={[0, 24]} getHandleProps={getHandleProps} disabled={!this.props.enabled} />
                    ))}
                </div>
              )}
            </Handles>

            <Handles>
              {({ handles, getHandleProps }) => (
                <div className="slider-handles">
                  {handles
                    .filter((d, i) => i % 2 === 0)
                    .map(handle => (
                      <HandleEnd key={handle.id} handle={handle} domain={[0, 24]} getHandleProps={getHandleProps} disabled={!this.props.enabled} />
                    ))}
                </div>
              )}
            </Handles>

            <Tracks>
              {({ tracks, getTrackProps }) => (
                <div>
                  {tracks
                    .filter((d, i) => i % 2 !== 0)
                    .map(({ id, source, target }) => (
                      <Track key={id} source={source} target={target} getTrackProps={getTrackProps} disabled={!this.props.enabled} />
                    ))}
                </div>
              )}
            </Tracks>

            <Ticks count={24}>
              {({ ticks }) => (
                <div className="slider-ticks">
                  {ticks.map(tick => (
                    <Tick key={tick.id} tick={tick} count={ticks.length} />
                  ))}
                </div>
              )}
            </Ticks>
          </Slider>
        </div>
      </Container>
    );
  }
}

export default MySlider;
