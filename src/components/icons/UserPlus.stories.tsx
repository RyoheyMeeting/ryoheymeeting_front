import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { UserPlus } from "./index";

export default {
  title: "Icons/UserPlus",
  component: UserPlus,
} as ComponentMeta<typeof UserPlus>;

const Template: ComponentStory<typeof UserPlus> = (args) => <UserPlus {...args} />;

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
