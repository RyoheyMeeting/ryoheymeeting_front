import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CalendarAlt } from "./index";

export default {
  title: "Icons/CalendarAlt",
  component: CalendarAlt,
} as ComponentMeta<typeof CalendarAlt>;

const Template: ComponentStory<typeof CalendarAlt> = (args) => <CalendarAlt {...args} />;

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
