import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Mute } from "./index";

export default {
  title: "Icons/Mute",
  component: Mute,
} as ComponentMeta<typeof Mute>;

const Template: ComponentStory<typeof Mute> = (args) => <Mute {...args} />;

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
