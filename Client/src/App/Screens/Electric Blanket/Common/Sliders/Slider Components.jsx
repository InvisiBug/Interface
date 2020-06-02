// Components
import React from "react";
import PropTypes from "prop-types";

const startingHandle = "rgba(255,135,51,.9)";
const endingHandle = "rgba(0,153,255,.9)";
const tracks = "rgba(255,255,255,.7)";
const railColour = "rgba(200,200,200,.5)";

const textColour = "white";

////////////////////////////////////////////////////////////////////////
//
// #     #
// #     #   ##   #    # #####  #      ######  ####
// #     #  #  #  ##   # #    # #      #      #
// ####### #    # # #  # #    # #      #####   ####
// #     # ###### #  # # #    # #      #           #
// #     # #    # #   ## #    # #      #      #    #
// #     # #    # #    # #####  ###### ######  ####
//
////////////////////////////////////////////////////////////////////////
export function HandleStart({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
  disabled
}) {
  // *NB* , removed after disabled
  return (
    <div
      style={{
        left: `${percent}%`,
        position: "absolute",
        marginLeft: -14,
        marginTop: -11,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: disabled ? "#666" : endingHandle, // Ending handle
        color: textColour
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: "Roboto", fontSize: 11, marginTop: 8 }}>
        {value % 1 === 0.25
          ? "15"
          : value % 1 === 0.5
          ? "30"
          : value % 1 === 0.75
          ? "45"
          : value % 1 === 0.0
          ? "00"
          : null}
      </div>
    </div>
  );
}

export function HandleEnd({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
  disabled
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: "absolute",
        marginLeft: -14,
        marginTop: -11,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: disabled ? "#666" : startingHandle, // Starting Handle
        color: textColour
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: "Roboto", fontSize: 11, marginTop: 8 }}>
        {value % 1 === 0.25
          ? "15"
          : value % 1 === 0.5
          ? "30"
          : value % 1 === 0.75
          ? "45"
          : value % 1 === 0.0
          ? "00"
          : null}
      </div>
    </div>
  );
}

HandleStart.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
    disabled: PropTypes.bool
  }).isRequired,

  getHandleProps: PropTypes.func.isRequired
};

HandleEnd.defaultProps = {
  disabled: false
};

HandleStart.defaultProps = {
  disabled: false
};

////////////////////////////////////////////////////////////////////////
//
// #######
//    #    #####    ##    ####  #    #
//    #    #    #  #  #  #    # #   #
//    #    #    # #    # #      ####
//    #    #####  ###### #      #  #
//    #    #   #  #    # #    # #   #
//    #    #    # #    #  ####  #    #
//
////////////////////////////////////////////////////////////////////////
export function Track({ source, target, getTrackProps, disabled }) {
  return (
    <div
      style={{
        position: "absolute",
        height: 8,
        zIndex: 1,
        backgroundColor: disabled ? "#666" : tracks, // Tracks between handles
        borderRadius: 4,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()}
    />
  );
}

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,

  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,

  getTrackProps: PropTypes.func.isRequired
};

////////////////////////////////////////////////////////////////////////
//
// #######
//    #    #  ####  #    #  ####
//    #    # #    # #   #  #
//    #    # #      ####    ####
//    #    # #      #  #        #
//    #    # #    # #   #  #    #
//    #    #  ####  #    #  ####
//
////////////////////////////////////////////////////////////////////////
export function Tick({ tick, count, format }) {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          marginTop: 14,
          width: 1,
          height: 5,
          backgroundColor: "rgb(200,200,200)", // Ticks
          left: `${tick.percent}%`
        }}
      />
      <div
        style={{
          position: "absolute",
          marginTop: 22,
          fontSize: 10,
          fontFamily: "Arial",
          textAlign: "center",
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
}

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,

  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired
};

Tick.defaultProps = {
  format: d => d
};

export const railStyle = {
  position: "absolute",
  width: "100%",
  height: 8,
  borderRadius: 4,
  cursor: "pointer",
  backgroundColor: railColour // Rail
};

export const sliderStyle = {
  position: "relative",
  width: "100%"
};
