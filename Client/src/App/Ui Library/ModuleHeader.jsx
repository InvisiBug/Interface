/** @jsx jsx */
// import React from "react";
import { jsx, css } from "@emotion/core";
import { connectedColour, disconnectedColour } from "./Constants";

const ModuleHeader = ({ children, colour = "#000", connection = true }) => {
  const baseStyle = css`
    box-sizing: border-box;
    font-size: 25px;
    white-space: nowrap;
  `;

  const connected = css`
    color: ${connectedColour};
  `;

  const disconnected = css`
    color: ${disconnectedColour};
  `;

  return <h3 css={[baseStyle, connection ? connected : disconnected]}>{children}</h3>;
};

export default ModuleHeader;
