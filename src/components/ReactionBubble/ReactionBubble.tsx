import React from "react";
import { ReactionBubbleStyle, ReactionBubbleStyleProps } from "./ReactionBubbleStyle";

type Props = ReactionBubbleStyleProps & {
  icon?: React.ReactElement;
  //size_?:;
};

export const ReactionBubble: React.FC<Props> = ({ icon, ...styleProps }) => {
  return <ReactionBubbleStyle {...styleProps}>{icon}</ReactionBubbleStyle>;
};
