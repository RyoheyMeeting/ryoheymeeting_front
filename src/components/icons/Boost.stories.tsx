import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Boost } from "./index";

export default {
  title: "Icons/Boost",
  component: Boost,
} as ComponentMeta<typeof Boost>;

const Template: ComponentStory<typeof Boost> = (args) => <Boost {...args} />;

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
