import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Toggle } from "./Toggle";
import { Pen } from "components/icons";

export default {
  title: "components/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <Pen fill="white" />,
};
