/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

import OnButton from "./OnButton";
import OffButton from "./OffButton";

import AutoButton from "./AutoButton";
import ManualButton from "./ManualButton";

// Boostrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 175px;
  width: 300px;

  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.1);
  /* background: red; */
  color: white;
  font-family: "Arial";
  font-size: 25px;
  white-space: nowrap;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const titleStyle = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 25px;
  left: 50%;
`;

const operationMode = css`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 75%;
  top: 70px;
  left: 50%;
`;

const manualLocked = css`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 75%;
  top: 130px;
  left: 50%;
  opacity: 0.1;
`;

const manualUnlocked = css`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 75%;
  top: 130px;
  left: 50%;
`;

const SimpleOnOff = ({
  title,
  pos,
  onAction,
  offAction,
  autoAction,
  manualAction,
  auto,
  state,
  connection
}) => {
  return (
    <div css={container} style={{ top: `${pos[0]}%`, left: `${pos[1]}%` }}>
      <h3
        css={titleStyle}
        style={{ color: connection ? "white" : "orangeRed" }}
      >
        {title}
      </h3>

      <div css={operationMode}>
        <Row>
          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <ManualButton isActive={!auto} handleClick={manualAction} />
          </Col>

          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <AutoButton isActive={auto} handleClick={autoAction} />
          </Col>
        </Row>
      </div>

      <div css={auto ? manualLocked : manualUnlocked}>
        <Row>
          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <OffButton isActive={!state} handleClick={offAction} />
          </Col>

          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <OnButton isActive={state} handleClick={onAction} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SimpleOnOff;
