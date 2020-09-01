// Components
import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import Container from "react-bootstrap/Container";
import {
  HandleStart,
  Track,
  Tick,
  HandleEnd,
  railStyle,
  sliderStyle
} from "./Slider Components";

const MySlider = ({ enabled, vals, update, day }) => {
  return (
    <div style={{ margin: "0%", width: "100%" }}>
      <Slider
        disabled={!enabled}
        mode={2}
        step={0.25}
        domain={[0, 24]}
        rootStyle={sliderStyle}
        onChange={newVals => {
          update(newVals, day);
        }}
        values={vals}
      >
        <Rail>
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>

        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles
                .filter((d, i) => i % 2 !== 0)
                .map(handle => (
                  <HandleStart
                    key={handle.id}
                    handle={handle}
                    domain={[0, 24]}
                    getHandleProps={getHandleProps}
                    disabled={!enabled}
                  />
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
                  <HandleEnd
                    key={handle.id}
                    handle={handle}
                    domain={[0, 24]}
                    getHandleProps={getHandleProps}
                    disabled={!enabled}
                  />
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
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                    disabled={!enabled}
                  />
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
  );
};

export default MySlider;
