import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TileBack } from "./TileBack";
import styled from "styled-components";

export default {
  title: "components/TileBack",
  component: TileBack,
} as ComponentMeta<typeof TileBack>;

const Template: ComponentStory<typeof TileBack> = (args) => <TileBack {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "default",
  children: (
    <div>
      <h1>内容１</h1>
      <p>ここに内容の文章が入ります</p>
    </div>
  ),
  useHeadPadding: true,
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  ...Default.args,
  title: "TOP",
};

const Wrapper = styled.div`
  width: 100%;
  height: 1000px;
`;

const LargeSizeTemplate: ComponentStory<typeof TileBack> = (args) => (
  <Wrapper>
    <TileBack {...args} />
  </Wrapper>
);

export const LargeSize = LargeSizeTemplate.bind({});
LargeSize.args = {
  ...Default.args,
};
