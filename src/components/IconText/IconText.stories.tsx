import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { IconText } from "./IconText";
import { Home } from "components/icons";

export default {
  title: "components/IconText",
  component: IconText,
} as ComponentMeta<typeof IconText>;

const Template: ComponentStory<typeof IconText> = (args) => <IconText {...args} />;

export const Default = Template.bind({});
Default.args = {
  Icon: Home,
  text: "ホーム",
  color: "default",
};

export const Orange = Template.bind({});
Orange.args = {
  ...Default.args,
  color: "orange",
};
