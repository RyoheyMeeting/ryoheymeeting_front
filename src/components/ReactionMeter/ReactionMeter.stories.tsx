import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ReactionMeter } from "./ReactionMeter";

export default {
  title: "components/ReactionMeter",
  component: ReactionMeter,
} as ComponentMeta<typeof ReactionMeter>;

const Template: ComponentStory<typeof ReactionMeter> = (args) => <ReactionMeter {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "psycho",
};
