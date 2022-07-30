import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AddStamp } from "./index";

export default {
  title: "Icons/AddStamp",
  component: AddStamp,
} as ComponentMeta<typeof AddStamp>;

const Template: ComponentStory<typeof AddStamp> = (args) => <AddStamp {...args} />;

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
