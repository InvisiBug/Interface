import React from "react";
import AutoController from "../App/Ui Library//Controllers/AutoControl";

export default {
  title: "Kavanet/Auto Control",
  component: AutoController,
  argTypes: {
    connection: { control: "boolean" },
    state: { control: "boolean" },
    auto: { control: "boolean" }
  }
};

const Template = args => <AutoController {...args} />;

let state = true;
export const instance = Template.bind({});
instance.args = {
  title: "Auto Control",
  pos: [50, 50],
  state: state,
  connection: true,
  auto: true,
  onAction: () => console.log("On Button"),
  offAction: () => console.log("Off Button"),
  autoAction: () => console.log("Auto Button"),
  manualButton: () => console.log("Manual Button")
};
