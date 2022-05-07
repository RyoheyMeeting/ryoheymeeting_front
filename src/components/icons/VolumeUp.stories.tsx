import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { VolumeUp } from "./index";

export default {
  title: "Icons/VolumeUp",
  component: VolumeUp,
} as ComponentMeta<typeof VolumeUp>;

const Template: ComponentStory<typeof VolumeUp> = (args) => <VolumeUp {...args} />;

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
