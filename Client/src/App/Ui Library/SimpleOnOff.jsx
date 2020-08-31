/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

import OnButton from "./OnButton";
import OffButton from "./OffButton";

// Boostrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 120px;
  width: 300px;

  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.1);
  color: white;
  font-family: Arial;
  font-size: 25px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const heading = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 20%;
  left: 50%;
  white-space: nowrap;
`;

const buttons = css`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 75%;
  top: 65%;
  left: 50%;
`;

const SimpleOnOff = ({
  title,
  pos,
  onAction,
  offAction,
  state,
  connection
}) => {
  return (
    <div css={container} style={{ top: `${pos[0]}%`, left: `${pos[1]}%` }}>
      <h3
        css={heading}
        style={connection ? { color: "white" } : { color: "orangered" }}
      >
        {title}
      </h3>

      <div css={buttons}>
        <Row>
          <Col md={6}>
            <OffButton isActive={!state} handleClick={offAction} />
          </Col>

          <Col md={6}>
            <OnButton isActive={state} handleClick={onAction} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SimpleOnOff;
