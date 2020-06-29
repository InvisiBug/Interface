import React from "react";
import { StyleSheet, css } from "aphrodite";

import RadiatorFan from "./RadiatorFan.jsx";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    height: "850px",
    width: "1200px",
    left: "50%",
    top: "50%"
  }
});

const AdvancedScreen = () => {
  return (
    // <div className={css(styles.container)}>
    <RadiatorFan />
    // </div>
  );
};

export default AdvancedScreen;
