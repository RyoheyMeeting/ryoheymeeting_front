import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PresenterIcon } from "./PresenterIcon";

export default {
  title: "components/PresenterIcon",
  component: PresenterIcon,
} as ComponentMeta<typeof PresenterIcon>;

const Template: ComponentStory<typeof PresenterIcon> = (args) => <PresenterIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  photoUrl: "img/stamp_example.png",
  presenterName: "どなたか",
  timerProps: {
    maxTime: new Date(60000),
    startTime: new Date(),
  },
};
