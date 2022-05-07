import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Psyco } from "./index";

export default {
  title: "Icons/Psyco",
  component: Psyco,
} as ComponentMeta<typeof Psyco>;

const Template: ComponentStory<typeof Psyco> = (args) => <Psyco {...args} />;

export const Default = Template.bind({});
Default.args = {
  display: "inline-block",
  wrapper: "svg",
  fill: "#252525",
  size: "24px",
};

export const Orange = Template.bind({});
Orange.args = {
  ...Default.args,
  fill: "#FF5500",
  size: "64px",
};
