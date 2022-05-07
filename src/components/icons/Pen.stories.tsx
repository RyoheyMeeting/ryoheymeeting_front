import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Pen } from "./index";

export default {
  title: "Icons/Pen",
  component: Pen,
} as ComponentMeta<typeof Pen>;

const Template: ComponentStory<typeof Pen> = (args) => <Pen {...args} />;

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
