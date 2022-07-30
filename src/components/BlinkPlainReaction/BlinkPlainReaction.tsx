import React from "react";
import { useBlinkPlainReactionState } from "./hooks/useBlinkPlainReactionState";
import { BlinkPlainReactionStyle, BlinkPlainReactionStyleProps, StampStyle } from "./BlinkPlainReactionStyle";

type Props = BlinkPlainReactionStyleProps & {
  plainReactionId: string;
  quiteCallback?: () => void;
};

export const BlinkPlainReaction: React.FC<Props> = ({ plainReactionId, quiteCallback, ...styleProps }) => {
  const { stampProps, animate } = useBlinkPlainReactionState(plainReactionId, quiteCallback);
  return (
    <BlinkPlainReactionStyle {...styleProps} animate={animate}>
      <StampStyle {...stampProps} color="black" size="L" />
    </BlinkPlainReactionStyle>
  );
};
