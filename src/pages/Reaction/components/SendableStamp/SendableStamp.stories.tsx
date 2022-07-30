import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SendableStamp } from "./SendableStamp";
import styled from "styled-components";

export default {
  title: "components/SendableStamp",
  component: SendableStamp,
} as ComponentMeta<typeof SendableStamp>;

const Wrapper = styled.div`
  padding: 0 200px;
`;

const Template: ComponentStory<typeof SendableStamp> = (args) => (
  <Wrapper>
    <SendableStamp {...args} />
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  stampProps: {
    stampName: "スタンプ",
    stampUrl: "/img/stamp_example.png",
  },
};
