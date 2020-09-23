/** @jsx jsx */
// import React from "react";
import { jsx, css } from "@emotion/core";
import Header from "../ModuleHeader";
import Button from "../Button";
import { offColour, onColour } from "../Constants";

const AutoControl = ({
  title = "New Auto Control",
  pos = [50, 50],
  onAction,
  offAction,
  autoAction,
  manualAction,
  auto,
  state = false,
  connection = false
}) => {
  const header = css`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 12%;
    left: 50%;
  `;

  const Container = css`
    position: absolute;
    transform: translate(-50%, -50%);
    height: 175px;
    width: 300px;

    top: ${pos[1]}%;
    left: ${pos[0]}%;

    border-radius: 20px;

    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(50, 50, 50, 0.1);

    font-family: Arial;
  `;

  const autoManuaButtons = css`
    position: absolute;
    transform: translate(-50%, -50%);
    width: 75%;
    top: 40%;
    left: 50%;

    display: flex;
    justify-content: space-between;
  `;

  const onOffButtons = css`
    position: absolute;
    transform: translate(-50%, -50%);
    width: 75%;
    top: 75%;
    left: 50%;

    display: flex;
    justify-content: space-between;
  `;

  const manualLocked = css`
    opacity: 0.1;
  `;

  return (
    <div css={Container}>
      <div css={header}>
        <Header connection={connection}>{title}</Header>
      </div>

      <div css={autoManuaButtons}>
        <Button isActive={!auto} handleClick={manualAction} activeColour={offColour}>
          Manual
        </Button>

        <Button isActive={auto} handleClick={autoAction} activeColour={onColour}>
          Auto
        </Button>
      </div>

      <div css={[onOffButtons, auto && manualLocked]}>
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

export default AutoControl;
