import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SpeechBalloon } from "./SpeechBalloon";

export default {
  title: "components/SpeechBalloon",
  component: SpeechBalloon,
} as ComponentMeta<typeof SpeechBalloon>;

const Template: ComponentStory<typeof SpeechBalloon> = (args) => <SpeechBalloon {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "吹き出しにメッセージを付けてユーザに分かりやすく付加情報を提示しましょう！",
  width: "260px",
};

export const Long = Template.bind({});
Long.args = {
  ...Default.args,
  width: "400px",
};
