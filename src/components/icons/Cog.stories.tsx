import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Cog } from "./index";

export default {
  title: "Icons/Cog",
  component: Cog,
} as ComponentMeta<typeof Cog>;

const Template: ComponentStory<typeof Cog> = (args) => <Cog {...args} />;

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
