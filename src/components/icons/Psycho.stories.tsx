import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Psycho } from "./index";

export default {
  title: "Icons/Psycho",
  component: Psycho,
} as ComponentMeta<typeof Psycho>;

const Template: ComponentStory<typeof Psycho> = (args) => <Psycho {...args} />;

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
