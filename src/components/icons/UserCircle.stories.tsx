import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { UserCircle } from "./index";

export default {
  title: "Icons/UserCircle",
  component: UserCircle,
} as ComponentMeta<typeof UserCircle>;

const Template: ComponentStory<typeof UserCircle> = (args) => <UserCircle {...args} />;

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
