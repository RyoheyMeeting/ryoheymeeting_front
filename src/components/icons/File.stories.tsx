import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { File } from "./index";

export default {
  title: "Icons/File",
  component: File,
} as ComponentMeta<typeof File>;

const Template: ComponentStory<typeof File> = (args) => <File {...args} />;

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
