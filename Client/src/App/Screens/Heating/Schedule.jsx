/** @jsx jsx */
import React from "react";
import { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";
import MySlider from "../../Ui Library/Slider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 570px;
  width: 100%;
  top: 70%;
  left: 50%;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(50, 50, 50, 0.1);
  border-radius: 20px;
  color: white;
  font-family: "Arial";
  font-size: 20px;
  padding-left: 20px;
  padding-right: 30px;
`;

const slider = css`
  margin-top: 30px;
  &:first-of-type {
    margin-top: 50px;
  }
`;

const dateCol = css`
  text-align: center;
`;

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const Schedule = () => {
  const [schedule, setSchedule] = useState(JSON.parse(localStorage.getItem("Heating Schedule")));

  useEffect(() => {
    const timer = setTimeout(() => {
      setSchedule(JSON.parse(localStorage.getItem("Heating Schedule")));
    }, 100);
    return () => clearTimeout(timer);
  }, [schedule]);

  const updateSchedule = (newVals, day) => {
    var data = {
      ...schedule,
      [day]: newVals
    };

    fetch("/api/ci/schedule/update", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        data
      })
    });
  };

  return (
    <div css={container}>
      {days.map(day => (
        <Row css={slider} key={day}>
          <Col md={{ span: 1, offset: 0 }} css={dateCol}>
            <p className="dayText">{day.charAt(0).toUpperCase() + day.slice(1).substring(0, 2)}</p>
          </Col>
          <Col>
            <MySlider enabled={schedule.auto} vals={schedule[day]} day={day} update={updateSchedule} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Schedule;
