/** @jsx jsx */
// import React from "react";
import { jsx, css } from "@emotion/core";
import { inactiveColour, borderColour, textColour } from "./Constants";

const OnButton = ({ children, size = "m", isActive = true, activeColour, handleClick }) => {
  const baseStyle = css`
    border: 1px solid ${borderColour};
    height: 50px;
    box-sizing: border-box;

    font-size: 21px;
    border-radius: 0.25rem;
    color: ${textColour};

    cursor: pointer;
    user-select: none;

    display: flex;
    justify-content: center;
    align-items: center;

    :active {
      background-color: grey;
    }
  `;

  let activeStyles = css`
    background-color: ${activeColour};
  `;

  let inactiveStyles = css`
    background-color: ${inactiveColour};
  `;

  let smallSize = css`
    width: 65px;
  `;

  let mediumSize = css`
    width: 100px;
  `;

  let largeSize = css`
    width: 135px;
  `;

  // Styled component causes the onClick action to stop working

  return (
    <div
      css={[
        baseStyle,
        isActive ? activeStyles : inactiveStyles,
        size === "s" ? smallSize : size === "m" ? mediumSize : size === "l" ? largeSize : null
      ]}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default OnButton;
