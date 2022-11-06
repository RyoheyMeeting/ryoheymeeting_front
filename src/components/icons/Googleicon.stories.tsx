import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Googleicon } from "./index";

export default {
  title: "Icons/Googleicon",
  component: Googleicon,
} as ComponentMeta<typeof Googleicon>;

const Template: ComponentStory<typeof Googleicon> = (args) => <Googleicon {...args} />;

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
