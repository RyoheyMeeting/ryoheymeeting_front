import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Logo } from "./Logo";

export default {
  title: "components/Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Square = Template.bind({});
Square.args = {
  logokind: "square",
  size: "64px",
};

export const Full = Template.bind({});
Full.args = {
  logokind: "full",
  size: "128px",
};
