import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Child } from "./index";

export default {
  title: "Icons/Child",
  component: Child,
} as ComponentMeta<typeof Child>;

const Template: ComponentStory<typeof Child> = (args) => <Child {...args} />;

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
