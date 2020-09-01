/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

import ComputerPower from "./ComputerPower";
import ComputerAudio from "./Computer Audio";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 85%;
  width: 100%;
  /* // width: "1200px", */
  left: 50%;
  top: 50%;
`;

class Computer extends React.Component {
  render() {
    return (
      <div css={container}>
        <ComputerPower />
        <ComputerAudio />
      </div>
    );
  }
}

export default Computer;
