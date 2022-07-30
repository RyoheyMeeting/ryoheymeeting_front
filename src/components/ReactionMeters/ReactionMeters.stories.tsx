import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ReactionMeters } from "./ReactionMeters";

export default {
  title: "components/ReactionMeters",
  component: ReactionMeters,
} as ComponentMeta<typeof ReactionMeters>;

const Template: ComponentStory<typeof ReactionMeters> = (args) => <ReactionMeters {...args} />;

export const Default = Template.bind({});
Default.args = {};
