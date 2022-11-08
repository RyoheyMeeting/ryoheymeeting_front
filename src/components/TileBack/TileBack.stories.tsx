import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TileBack } from "./TileBack";
import styled from "styled-components";

export default {
  title: "components/TileBack",
  component: TileBack,
} as ComponentMeta<typeof TileBack>;

const Template: ComponentStory<typeof TileBack> = (args) => <TileBack {...args} />;

const Child = styled.div`
  width: 100%;
`;

const LargeChild = styled.div`
  width: 100%;
  height: 1000px;
`;

export const Default = Template.bind({});
Default.args = {
  type: "default",
  children: (
    <Child>
      <h1>内容１</h1>
      <p>ここに内容の文章が入ります</p>
    </Child>
  ),
  useHeadPadding: true,
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  ...Default.args,
  title: "TOP",
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  ...Default.args,
  children: (
    <LargeChild>
      <h1>内容１</h1>
      <p>ここに内容の文章が入ります</p>
    </LargeChild>
  ),
};
