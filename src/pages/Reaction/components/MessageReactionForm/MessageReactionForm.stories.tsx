import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MessageReactionForm } from "./MessageReactionForm";

export default {
  title: "components/MessageReactionForm",
  component: MessageReactionForm,
} as ComponentMeta<typeof MessageReactionForm>;

const Template: ComponentStory<typeof MessageReactionForm> = (args) => <MessageReactionForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
};

export const WithStamp = Template.bind({});
WithStamp.args = {
  ...Default.args,
  stampProps: {
    stampName: "いいね",
    stampUrl: "/img/stamp_example.png",
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};
