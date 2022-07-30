import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Bars } from "./index";

export default {
  title: "Icons/Bars",
  component: Bars,
} as ComponentMeta<typeof Bars>;

const Template: ComponentStory<typeof Bars> = (args) => <Bars {...args} />;

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
