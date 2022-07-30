import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { HiddenNextPresenter } from "./HiddenNextPresenter";

export default {
  title: "components/HiddenNextPresenter",
  component: HiddenNextPresenter,
} as ComponentMeta<typeof HiddenNextPresenter>;

const Template: ComponentStory<typeof HiddenNextPresenter> = (args) => <HiddenNextPresenter {...args} />;

export const Default = Template.bind({});
Default.args = {
  hide: false,
  nextPresenterProps: {
    introduction: "それなりに長い文章を打ってちょっと内容を確かめてみたい感はある",
  },
};
