import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FileSignature } from "./index";

export default {
  title: "Icons/FileSignature",
  component: FileSignature,
} as ComponentMeta<typeof FileSignature>;

const Template: ComponentStory<typeof FileSignature> = (args) => <FileSignature {...args} />;

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
