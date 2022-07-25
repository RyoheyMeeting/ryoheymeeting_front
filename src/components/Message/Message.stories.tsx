import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Message } from "./Message";

export default {
  title: "components/Message",
  component: Message,
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => <Message {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "メッセージ",
  stampProps: {
    stampName: "スタンプ",
    stampUrl: "/img/stamp_example.png",
  },
  maxWidth: "350px",
};
