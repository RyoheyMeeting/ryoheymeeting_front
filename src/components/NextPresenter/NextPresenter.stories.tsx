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
  introduction: "最近彼女が出来たあの人？！",
};

export const LongIntroduction = Template.bind({});
LongIntroduction.args = {
  introduction: "凄く長い紹介文が来た時にどう表示するか見ものですね。",
};

export const ShortIntroduction = Template.bind({});
ShortIntroduction.args = {
  introduction: "短い紹介",
};
