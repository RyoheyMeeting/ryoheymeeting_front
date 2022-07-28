import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ActionButton } from "./ActionButton";
import { VolumeSlash } from "components/icons";

export default {
  title: "components/ActionButton",
  component: ActionButton,
} as ComponentMeta<typeof ActionButton>;

const Template: ComponentStory<typeof ActionButton> = (args) => <ActionButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  Icon: VolumeSlash,
  status: "ready",
  acitonName: "ミュート",
  remainTime: new Date(30000),
};
