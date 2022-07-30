import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StampPalleteGroup } from "./StampPalleteGroup";
import { SendableStamp } from "../../SendableStamp/SendableStamp";
import { StampPallete } from "../StampPallete";

export default {
  title: "components/StampPalleteGroup",
  component: StampPalleteGroup,
} as ComponentMeta<typeof StampPalleteGroup>;

const Template: ComponentStory<typeof StampPalleteGroup> = (args) => (
  <StampPallete>
    <StampPalleteGroup {...args} />
  </StampPallete>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <SendableStamp
        stampProps={{
          stampName: "スタンプ",
          stampUrl: "/img/stamp_example.png",
        }}
      />
      <SendableStamp
        stampProps={{
          stampName: "スタンプ",
          stampUrl: "/img/stamp_example.png",
        }}
      />
      <SendableStamp
        stampProps={{
          stampName: "スタンプ",
          stampUrl: "/img/stamp_example.png",
        }}
      />
      <SendableStamp
        stampProps={{
          stampName: "スタンプ",
          stampUrl: "/img/stamp_example.png",
        }}
      />
      <SendableStamp
        stampProps={{
          stampName: "スタンプ",
          stampUrl: "/img/stamp_example.png",
        }}
      />
      <SendableStamp
        stampProps={{
          stampName: "スタンプ",
          stampUrl: "/img/stamp_example.png",
        }}
      />
      <SendableStamp
        stampProps={{
          stampName: "スタンプ",
          stampUrl: "/img/stamp_example.png",
        }}
      />
    </>
  ),
};
