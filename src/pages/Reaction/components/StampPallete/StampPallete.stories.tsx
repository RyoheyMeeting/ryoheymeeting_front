import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StampPallete } from "./StampPallete";
import { SendableStamp } from "../SendableStamp/SendableStamp";

export default {
  title: "components/StampPallete",
  component: StampPallete,
} as ComponentMeta<typeof StampPallete>;

const Template: ComponentStory<typeof StampPallete> = (args) => <StampPallete {...args} />;

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
    </>
  ),
};
