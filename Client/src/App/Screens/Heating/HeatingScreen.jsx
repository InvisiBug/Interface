/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

import Boost from "./Boost";
import ActiveIndicator from "./ActiveIndicator";
import OnOff from "./OnOff";
import Schedule from "./Schedule";
import RadiatorFan from "./RadiatorFan";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 85%;
  width: 90%;
  max-width: 1500px;
  top: 50%;
  left: 50%;
`;

const Heating = () => {
  return (
    <div css={container}>
      <Boost />
      <ActiveIndicator />
      <OnOff />
      <Schedule />
      <RadiatorFan />
    </div>
  );
};

export default Heating;
