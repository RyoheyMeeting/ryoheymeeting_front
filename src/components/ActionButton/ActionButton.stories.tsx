import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ActionButton } from "./ActionButton";

export default {
  title: "components/ActionButton",
  component: ActionButton,
} as ComponentMeta<typeof ActionButton>;

const Template: ComponentStory<typeof ActionButton> = (args) => <ActionButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  actionType: "mute",
  status: "default",
};

export const Boost = Template.bind({});
Boost.args = {
  actionType: "boost",
  status: "default",
};

export const Boostring = Template.bind({});
Boostring.args = {
  actionType: "boost",
  status: "doing",
};

export const Boosted = Template.bind({});
Boosted.args = {
  actionType: "boost",
  status: "disabled",
};
