import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Balloon } from "./Balloon";

export default {
  title: "components/Balloon",
  component: Balloon,
} as ComponentMeta<typeof Balloon>;

const Template: ComponentStory<typeof Balloon> = (args) => (
  <Balloon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  triPosition: "top",
  triAlign: "start",
  children: "hoge",
};

export const LargeContents = Template.bind({});
LargeContents.args = {
  triPosition: "top",
  triAlign: "start",
  children: <div style={{width: "200px", height: "200px"}}>hoge</div>,
};
