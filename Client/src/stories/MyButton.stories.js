import React from "react";

import Button from "../App/Ui Library/Button";

export default {
  title: "Kavanet/Button",
  component: Button,
  argTypes: {
    activeColour: { control: "color" }
  }
};

const Template = args => <Button {...args} />;

export const On = Template.bind({});
On.args = {
  children: "On",
  size: "m",
  activeColour: "rgba(0, 255, 0, 0.5)",
  isActive: false,
  handleClick: () => console.log(`${On.args.children} ${"Pressed"}`),
};

export const Off = Template.bind({});
Off.args = {
  children: "Off",
  size: "m",
  activeColour: "rgba(255,0,0,.5)",
  isActive: false,
  handleClick: () => console.log(`${Off.args.children} ${"Pressed"}`)
};
