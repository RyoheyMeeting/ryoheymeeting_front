import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StampMessage } from "./StampMessage";

export default {
  title: "components/StampMessage",
  component: StampMessage,
} as ComponentMeta<typeof StampMessage>;

const Template: ComponentStory<typeof StampMessage> = (args) => <StampMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  stampProps: {
    stampName: "いいね！",
    stampUrl: "/img/stamp_example.png",
  },
  userIconProps: {
    iconUrl: "/img/oldlogo.png",
  },
  userName: "りょうへい",
  message: "サイコです！",
};

export const Long = Template.bind({});
Long.args = {
  ...Default.args,
  message:
    "これがメッセージですが、メッセージでない可能性も考えて生きていかねばなりません。場合によっては更に長いメッセージが登場するかもしれませんが、それはプレゼンターによって読みづらい文章となってしまいます。文字数制限を付けるのもまた違うのでどうしようもないのかもしれません。",
};
