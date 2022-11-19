import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { VpnKey } from "./index";

export default {
  title: "Icons/VpnKey",
  component: VpnKey,
} as ComponentMeta<typeof VpnKey>;

const Template: ComponentStory<typeof VpnKey> = (args) => <VpnKey {...args} />;

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
