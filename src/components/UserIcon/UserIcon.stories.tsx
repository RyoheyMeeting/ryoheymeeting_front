import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserIcon } from "./UserIcon";

export default {
  title: "components/UserIcon",
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>;

const Template: ComponentStory<typeof UserIcon> = (args) => <UserIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconUrl: "/img/oldlogo.png",
};

export const SS = Template.bind({});
SS.args = {
  ...Default.args,
  size: "SS",
};

export const S = Template.bind({});
S.args = {
  ...Default.args,
  size: "S",
};

export const M = Template.bind({});
M.args = {
  ...Default.args,
  size: "M",
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

export const rectangleIcon = Template.bind({});
rectangleIcon.args = {
  ...Default.args,
  iconUrl: "/img/logo_full.svg",
  size: "XL",
};
