import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Equals } from "./index";

export default {
  title: "Icons/Equals",
  component: Equals,
} as ComponentMeta<typeof Equals>;

const Template: ComponentStory<typeof Equals> = (args) => <Equals {...args} />;

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
