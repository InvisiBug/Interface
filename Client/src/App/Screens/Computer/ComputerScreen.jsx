import React from "react";
import { StyleSheet, css } from "aphrodite";

import ComputerPower from "./Computer Power";
import ComputerAudio from "./Computer Audio";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    height: "850px",
    width: "100%",
    // width: "1200px",
    left: "50%",
    top: "50%",
    border: "1px solid blue"
  }
});

class Computer extends React.Component {
  render() {
    return (
      <div className={css(styles.container)}>
        <ComputerPower />
        <ComputerAudio />
      </div>
    );
  }
}

export default Computer;
