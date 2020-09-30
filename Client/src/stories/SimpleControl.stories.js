import React from "react";

import SimpleControl from "../App/Ui Library/Controllers/SimpleControl";

export default {
  title: "Kavanet/Simple Control",
  component: SimpleControl,
  argTypes: {
    connection: { control: "boolean" },
    state: { control: "boolean" }
  }
};

const Template = args => <SimpleControl {...args} />;

export const instance = Template.bind({});
instance.args = {
  title: "Simple Control",
  pos: [50, 50],
  state: true,
  connection: true,
  onAction: () => console.log("On Button"),
  offAction: () => console.log("Off Button")
};
