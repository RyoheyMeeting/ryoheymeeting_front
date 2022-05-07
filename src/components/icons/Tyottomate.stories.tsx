import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Tyottomate } from "./index";

export default {
  title: "Icons/Tyottomate",
  component: Tyottomate,
} as ComponentMeta<typeof Tyottomate>;

const Template: ComponentStory<typeof Tyottomate> = (args) => <Tyottomate {...args} />;

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
