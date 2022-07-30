import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import React from "react";
import { IconStyleProps, ReactionBubbleStyle, ReactionBubbleStyleProps } from "./ReactionBubbleStyle";

type Props = ReactionBubbleStyleProps & {
  Icon: React.ComponentType<IconProps>;
};

export const ReactionBubble: React.FC<Props> = ({ Icon, ...styleProps }) => {
  return (
    <ReactionBubbleStyle {...styleProps}>
      <Icon {...IconStyleProps(styleProps)} />
    </ReactionBubbleStyle>
  );
};
