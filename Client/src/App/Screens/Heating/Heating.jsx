/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

import Boost from "./Boost";
import ActiveIndicator from "./ActiveIndicator";
import OnOff from "./OnOff";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 1100px;
  top: 60%;
  left: 50%;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.1);
  border-radius: 20px;
  color: white;
  font-family: "Arial";
  font-size: 20px;

  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Heating = () => {
  return (
    <>
      <Boost />
      <ActiveIndicator />
      <OnOff />
    </>
  );
};

export default Heating;
