import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tyottomate } from "components/icons";
import { Psycho } from "components/icons";
import { Iine } from "components/icons";
import { ReactionBubble } from "./ReactionBubble";

export default {
  title: "components/ReactionBubble",
  component: ReactionBubble,
} as ComponentMeta<typeof ReactionBubble>;

const Template: ComponentStory<typeof ReactionBubble> = (args) => <ReactionBubble {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <Tyottomate fill="white" /*size="サイズ変えろpx"*/ />,
  //TODO：透明度反映しろ
  reactionType: "mate",
  size: "100px",
};

export const TyottomateActive = Template.bind({});
TyottomateActive.args = {
  ...Default.args,
  icon: <Tyottomate fill="white" />,
  reactionType: "mate",
  size: "200px",
};

export const pschoActive = Template.bind({});
pschoActive.args = {
  ...Default.args,
  icon: <Psycho fill="white" />,
  reactionType: "psycho",
  size: "250px",
};

export const IineActive = Template.bind({});
IineActive.args = {
  ...Default.args,
  icon: <Iine fill="white" />,
  reactionType: "iine",
  size: "300px",
};
