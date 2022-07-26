import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AngleLeft } from "./index";

export default {
  title: "Icons/AngleLeft",
  component: AngleLeft,
} as ComponentMeta<typeof AngleLeft>;

const Template: ComponentStory<typeof AngleLeft> = (args) => <AngleLeft {...args} />;

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
