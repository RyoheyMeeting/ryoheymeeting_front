import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CollvoCoin } from "./index";

export default {
  title: "Icons/CollvoCoin",
  component: CollvoCoin,
} as ComponentMeta<typeof CollvoCoin>;

const Template: ComponentStory<typeof CollvoCoin> = (args) => <CollvoCoin {...args} />;

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
