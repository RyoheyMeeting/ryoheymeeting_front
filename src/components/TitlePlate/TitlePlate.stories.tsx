import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TitlePlate } from "./TitlePlate";

export default {
  title: "components/TitlePlate",
  component: TitlePlate,
} as ComponentMeta<typeof TitlePlate>;

const Template: ComponentStory<typeof TitlePlate> = (args) => <TitlePlate {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "ユーザートップ",
};
