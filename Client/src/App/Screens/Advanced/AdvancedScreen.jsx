/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

import RadiatorFan from "./RadiatorFan.jsx";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 85%;
  width: 100%;
  left: 50%;
  top: 50%;
`;

const AdvancedScreen = () => {
  return (
    <div css={container}>
      <RadiatorFan />
    </div>
  );
};

export default AdvancedScreen;
