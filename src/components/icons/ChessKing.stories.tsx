import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChessKing } from "./index";

export default {
  title: "Icons/ChessKing",
  component: ChessKing,
} as ComponentMeta<typeof ChessKing>;

const Template: ComponentStory<typeof ChessKing> = (args) => <ChessKing {...args} />;

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
