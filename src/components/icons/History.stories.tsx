import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { History } from "./index";

export default {
  title: "Icons/History",
  component: History,
} as ComponentMeta<typeof History>;

const Template: ComponentStory<typeof History> = (args) => <History {...args} />;

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
