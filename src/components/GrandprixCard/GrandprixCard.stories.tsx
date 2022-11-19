import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { GrandprixCard } from "./GrandprixCard";
import { GrandPrixStatus } from "services/GrandPrixes/GrandPrixes";

export default {
  title: "components/GrandprixCard",
  component: GrandprixCard,
} as ComponentMeta<typeof GrandprixCard>;

const Template: ComponentStory<typeof GrandprixCard> = (args) => <GrandprixCard {...args} />;

export const Yet = Template.bind({});
Yet.args = {
  title: "第１回　遼平会",
  subTitle: "逃げるは恥だが遼平は恥じゃない",
  date: new Date(),
  status: GrandPrixStatus.yet,
};

export const Doing = Template.bind({});
Doing.args = {
  title: "第１回　遼平会",
  subTitle: "逃げるは恥だが遼平は恥じゃない",
  date: new Date(),
  status: GrandPrixStatus.doing,
};

export const Done = Template.bind({});
Done.args = {
  title: "第１回　遼平会",
  subTitle: "逃げるは恥だが遼平は恥じゃない",
  date: new Date(),
  status: GrandPrixStatus.done,
};
