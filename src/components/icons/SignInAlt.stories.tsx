import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SignInAlt } from "./index";

export default {
  title: "Icons/SignInAlt",
  component: SignInAlt,
} as ComponentMeta<typeof SignInAlt>;

const Template: ComponentStory<typeof SignInAlt> = (args) => <SignInAlt {...args} />;

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
