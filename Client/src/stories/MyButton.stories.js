import React from "react";

// import { Button } from "./Button";
import OnButton from "../App/Ui Library/Button";

export default {
  title: "Mine/Button",
  component: OnButton,
  argTypes: {
    // backgroundColor: { control: "color" }
    isActive: { control: "boolean" }
  }
};

const Template = args => <OnButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isActive: true
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: "Button"
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button"
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button"
// };
