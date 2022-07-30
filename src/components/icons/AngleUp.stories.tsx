import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AngleUp } from "./index";

export default {
  title: "Icons/AngleUp",
  component: AngleUp,
} as ComponentMeta<typeof AngleUp>;

const Template: ComponentStory<typeof AngleUp> = (args) => <AngleUp {...args} />;

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
