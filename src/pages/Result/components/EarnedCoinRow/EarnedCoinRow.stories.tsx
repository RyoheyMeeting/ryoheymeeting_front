import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { EarnedCoinRow } from "./EarnedCoinRow";
import { testCommonUser } from "test_factories/User";

export default {
  title: "components/EarnedCoinRow",
  component: EarnedCoinRow,
} as ComponentMeta<typeof EarnedCoinRow>;

const Template: ComponentStory<typeof EarnedCoinRow> = (args) => (
  <EarnedCoinRow {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ranking: 1,
  user: {
    photoUrl: testCommonUser.photoURL,
    username: testCommonUser.displayName
  },
  counts: {
    psycho: {
      reaction: 123,
      boost: 12
    },
    wait: {
      reaction: 456,
      boost: 35.5
    },
    good: {
      reaction: 789,
      boost: 79.5
    },
  },
  total: 9056,
};
