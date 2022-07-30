import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SignOut } from "./index";

export default {
  title: "Icons/SignOut",
  component: SignOut,
} as ComponentMeta<typeof SignOut>;

const Template: ComponentStory<typeof SignOut> = (args) => <SignOut {...args} />;

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
