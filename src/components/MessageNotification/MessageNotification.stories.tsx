import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MessageNotification } from "./MessageNotification";

export default {
  title: "components/MessageNotification",
  component: MessageNotification,
} as ComponentMeta<typeof MessageNotification>;

const Template: ComponentStory<typeof MessageNotification> = (args) => <MessageNotification {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: "メッセージ",
  stampProps: {
    stampName: "スタンプ",
    stampUrl: "/img/stamp_example.png",
  },
  userIconProps: {
    iconUrl: "/img/oldlogo.png",
  },
  userName: "どなたか",
};
