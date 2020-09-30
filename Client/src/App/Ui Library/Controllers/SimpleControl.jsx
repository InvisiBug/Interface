/** @jsx jsx */
// import React from "react";
import { jsx, css } from "@emotion/core";
import Header from "../ModuleHeader";
import Button from "../Button";
import { offColour, onColour } from "../Constants";

const SimpleControl = ({ title = "New Simple Control", pos = [50, 50], onAction, offAction, state = false, connection = false }) => {
  const header = css`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 25%;
    left: 50%;
  `;

  const Container = css`
    position: absolute;
    transform: translate(-50%, -50%);
    height: 120px;
    width: 300px;

    top: ${pos[1]}%;
    left: ${pos[0]}%;

    border-radius: 20px;

    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(50, 50, 50, 0.1);

    font-family: Arial;
  `;

  const buttons = css`
    position: absolute;
    transform: translate(-50%, -50%);
    width: 75%;
    top: 70%;
    left: 50%;

    display: flex;
    justify-content: space-between;
  `;

  return (
    <div css={Container}>
      <div css={header}>
        <Header connection={connection}>{title}</Header>
      </div>

      <div css={buttons}>
        <Button isActive={!state} handleClick={offAction} activeColour={offColour}>
          Off
        </Button>

        <Button isActive={state} handleClick={onAction} activeColour={onColour}>
          On
        </Button>
      </div>
    </div>
  );
};

export default SimpleControl;
