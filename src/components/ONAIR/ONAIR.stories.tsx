import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ONAIR } from "./ONAIR";

export default {
  title: "components/ONAIR",
  component: ONAIR,
} as ComponentMeta<typeof ONAIR>;

const Template: ComponentStory<typeof ONAIR> = (args) => <ONAIR {...args} />;

export const Default = Template.bind({});
Default.args = {};
