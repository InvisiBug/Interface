import React from "react";

import HeatingSensor from "../App/Ui Library/HeatingSensor";

export default {
  title: "Kavanet/HeatingSensor",
  component: HeatingSensor,
  argTypes: {}
};

const Template = args => <HeatingSensor {...args} />;

export const Sensor = Template.bind({});
Sensor.args = {
  pos: [50, 50],
  datapoint: "test"
};
