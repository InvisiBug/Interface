/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const active = css`
  border-bottom: 1px solid grey;
  top: 0%;
  left: 0%;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  text-align: center;
  color: white;
`;

const inActive = css`
  border-bottom: 1px solid grey;
  background: rgba(255, 255, 255, 0);
  top: 0%;
  left: 0%;
  width: 100%;
  text-align: center;
  color: white;
`;

const iconCss = css`
  width: 30%;
  padding-top: 7%;
`;

const text = css`
  margin-top: 0%;
  font-size: 20px;
`;

const NavButton = ({ icon, name, handleClick, selection }) => {
  return (
    <div css={selection === name ? active : inActive} onClick={handleClick}>
      <img src={icon} alt="" css={iconCss} />
      <div css={text}>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default NavButton;
