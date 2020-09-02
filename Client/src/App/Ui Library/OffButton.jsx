/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const active = css`
  background-color: rgba(255, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 1);
  height: 50px;
  width: 100px;
  font-size: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  /* border: 1px solid red; */
`;

const inactive = css`
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 1);
  height: 50px;
  width: 100px;
  font-size: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
`;

const OnButton = ({ name, isActive, handleClick }) => {
  return (
    <div css={isActive ? active : inactive} onClick={handleClick}>
      Off
    </div>
  );
};

export default OnButton;