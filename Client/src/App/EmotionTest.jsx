/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
// import { StyleSheet, css } from "aphrodite";
import styled from "@emotion/styled";
// import { css } from "@emotion/core";#/** @jsx jsx */
import { jsx, css, Global, ClassNames } from "@emotion/core";

// import styled from "@emotion/styled/macro";
// import css from "@emotion/css/macro";
// import { css, keyframes, injectGlobal } from "emotion/macro";
// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     transform: "translate(-50%, -50%)",
//     height: "100px",
//     width: "100px",
//     top: "20%",
//     left: "25%",

//     borderRadius: "20px",

//     border: "1px solid rgba(255, 255, 255, 0.2)",
//     // background: "rgba(50, 50, 50, 0.1)",
//     background: "rgb(100,50,20)",
//     color: "white",
//     fontFamily: "Arial",
//     fontSize: "25px",

//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center"
//   }
// });

const EmotionTester = () => {
  // return <div className={css(styles.container)} />;
  return (
    <h1
      css={css`
        color: orange;
      `}
    >
      hello
    </h1>
  );
};

export default EmotionTester;
