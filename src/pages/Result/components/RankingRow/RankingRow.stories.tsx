import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RankingRow } from "./RankingRow";
import { testCommonUser } from "test_factories/User";

export default {
  title: "components/Result/RankingRow",
  component: RankingRow,
} as ComponentMeta<typeof RankingRow>;

const Template: ComponentStory<typeof RankingRow> = (args) => <RankingRow {...args} />;

export const Default = Template.bind({});
Default.args = {
  ranking: 1,
  user: {
    photoUrl: testCommonUser.photoURL,
    username: testCommonUser.displayName,
  },
  counts: {
    psycho: {
      reaction: 123,
      boost: 12,
    },
    wait: {
      reaction: 456,
      boost: 35.5,
    },
    good: {
      reaction: 789,
      boost: 79.5,
    },
  },
  total: 9056,
};
