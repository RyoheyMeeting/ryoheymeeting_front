import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ShoppingCart } from "./index";

export default {
  title: "Icons/ShoppingCart",
  component: ShoppingCart,
} as ComponentMeta<typeof ShoppingCart>;

const Template: ComponentStory<typeof ShoppingCart> = (args) => <ShoppingCart {...args} />;

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
