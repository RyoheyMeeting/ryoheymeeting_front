import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LogoContent } from "./index";

export default {
  title: "Icons/LogoContent",
  component: LogoContent,
} as ComponentMeta<typeof LogoContent>;

const Template: ComponentStory<typeof LogoContent> = (args) => <LogoContent {...args} />;

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
