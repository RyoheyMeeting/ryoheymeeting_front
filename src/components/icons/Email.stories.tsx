import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Email } from "./index";

export default {
  title: "Icons/Email",
  component: Email,
} as ComponentMeta<typeof Email>;

const Template: ComponentStory<typeof Email> = (args) => <Email {...args} />;

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
