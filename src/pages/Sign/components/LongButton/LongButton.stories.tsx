import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LongButton } from "./LongButton";
import { Home } from "components/icons";

export default {
  title: "components/Sign/LongButton",
  component: LongButton,
} as ComponentMeta<typeof LongButton>;

const Template: ComponentStory<typeof LongButton> = (args) => <LongButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "発表登録する",
  disabled: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  Icon: Home,
};
