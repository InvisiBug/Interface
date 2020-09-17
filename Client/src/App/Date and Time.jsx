/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";

const container = css`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 90px;
  width: 55%;
  top: 2%;
  left: 50%;

  max-width: 700px;
  min-width: 600px;

  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.2);

  background: rgba(50, 50, 50, 0.1);
  color: white;
  font-family: "Arial";
  font-size: 40px;
`;

const dateText = css`
  position: absolute;
  transform: translate(0%, -50%);
  top: 60%;
  left: 2.5%;
`;

const timeText = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 60%;
  left: 84%;
  white-space: nowrap;

  display: flex;
  justify-content: flex-end;
`;
const getTime = date => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const DateAndTime = () => {
  const [data, setData] = useState({
    time: getTime(new Date()),
    long: localStorage.getItem("longDate") // *NB* make it so this doesnt use local storage
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        time: getTime(new Date()),
        long: localStorage.getItem("longDate")
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div css={container}>
      <div css={dateText}>{data.long}</div>
      <div css={timeText}>{data.time}</div>
    </div>
  );
};

export default DateAndTime;
