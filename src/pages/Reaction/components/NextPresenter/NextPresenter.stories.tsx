import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NextPresenter } from "./NextPresenter";

export default {
  title: "components/NextPresenter",
  component: NextPresenter,
} as ComponentMeta<typeof NextPresenter>;

const Template: ComponentStory<typeof NextPresenter> = (args) => <NextPresenter {...args} />;

export const Default = Template.bind({});
Default.args = {
  introduction: "最近結婚したあの人？！",
};

export const LongSentence = Template.bind({});
LongSentence.args = {
  ...Default.args,
  introduction: "歴史上の人物を模倣し、全てにおいて完璧人間となったあの人？！",
};
