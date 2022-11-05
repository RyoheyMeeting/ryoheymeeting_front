import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";
import { Home } from "components/icons";

export default {
  title: "components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "発表登録する",
  disabled: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  iconPlace: "left",
  Icon: Home,
};
