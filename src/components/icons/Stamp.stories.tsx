import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Stamp } from "./index";

export default {
  title: "Icons/Stamp",
  component: Stamp,
} as ComponentMeta<typeof Stamp>;

const Template: ComponentStory<typeof Stamp> = (args) => <Stamp {...args} />;

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
