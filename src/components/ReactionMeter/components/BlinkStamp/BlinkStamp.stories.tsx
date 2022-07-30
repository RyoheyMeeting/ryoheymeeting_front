import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BlinkStamp } from "./BlinkStamp";

export default {
  title: "components/BlinkStamp",
  component: BlinkStamp,
} as ComponentMeta<typeof BlinkStamp>;

const Template: ComponentStory<typeof BlinkStamp> = (args) => <BlinkStamp {...args} />;

export const Default = Template.bind({});
Default.args = {
  stampProps: {
    stampName: "いいね！",
    stampUrl: "/img/stamp_example.png",
  },
};
