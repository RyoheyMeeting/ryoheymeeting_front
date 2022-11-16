import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { GrandprixStatusTag } from "./GrandprixStatusTag";
import { GrandPrixStatus } from "services/GrandPrixes/GrandPrixes";

export default {
  title: "components/GrandprixStatusTag",
  component: GrandprixStatusTag,
} as ComponentMeta<typeof GrandprixStatusTag>;

const Template: ComponentStory<typeof GrandprixStatusTag> = (args) => <GrandprixStatusTag {...args} />;

export const Yet = Template.bind({});
Yet.args = {
  status: GrandPrixStatus.yet,
};

export const Doing = Template.bind({});
Doing.args = {
  status: GrandPrixStatus.doing,
};

export const Done = Template.bind({});
Done.args = {
  status: GrandPrixStatus.done,
};
