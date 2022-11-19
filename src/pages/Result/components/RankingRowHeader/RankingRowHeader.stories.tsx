import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RankingRowHeader } from "./RankingRowHeader";

export default {
  title: "components/Result/RankingRowHeader",
  component: RankingRowHeader,
} as ComponentMeta<typeof RankingRowHeader>;

const Template: ComponentStory<typeof RankingRowHeader> = (args) => <RankingRowHeader {...args} />;

export const Default = Template.bind({});
Default.args = {};
