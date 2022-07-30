import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Stamp } from "./Stamp";

export default {
  title: "components/Stamp",
  component: Stamp,
} as ComponentMeta<typeof Stamp>;

const Template: ComponentStory<typeof Stamp> = (args) => <Stamp {...args} />;

export const Default = Template.bind({});
Default.args = {
  stampName: "スタンプ１",
  stampUrl: "/img/stamp_example.png",
  size: "M",
  active: true,
  color: "orange",
};

export const SSActive = Template.bind({});
SSActive.args = {
  ...Default.args,
  size: "SS",
};

export const SDeactive = Template.bind({});
SDeactive.args = {
  ...Default.args,
  size: "S",
  active: false,
};

export const MBlack = Template.bind({});
MBlack.args = {
  ...Default.args,
  size: "M",
  color: "black",
};

export const L = Template.bind({});
L.args = {
  ...Default.args,
  size: "L",
};

export const XL = Template.bind({});
XL.args = {
  ...Default.args,
  size: "XL",
};

export const rectangleStamp = Template.bind({});
rectangleStamp.args = {
  ...Default.args,
  stampUrl: "/img/logo_full.svg",
  active: false,
  size: "XL",
};
