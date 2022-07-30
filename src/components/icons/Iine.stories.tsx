import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Iine } from "./index";

export default {
  title: "Icons/Iine",
  component: Iine,
} as ComponentMeta<typeof Iine>;

const Template: ComponentStory<typeof Iine> = (args) => <Iine {...args} />;

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
