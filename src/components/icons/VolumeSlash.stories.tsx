import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { VolumeSlash } from "./index";

export default {
  title: "Icons/VolumeSlash",
  component: VolumeSlash,
} as ComponentMeta<typeof VolumeSlash>;

const Template: ComponentStory<typeof VolumeSlash> = (args) => <VolumeSlash {...args} />;

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
