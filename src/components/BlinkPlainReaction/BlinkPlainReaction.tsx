import React from "react";
import { useBlinkPlainReactionState } from "./hooks/useBlinkPlainReactionState";
import { BlinkPlainReactionStyle, BlinkPlainReactionStyleProps, StampStyle } from "./BlinkPlainReactionStyle";

type Props = BlinkPlainReactionStyleProps & {
  plainReactionId: string;
  playSoundEffect?: boolean;
  quiteCallback?: () => void;
};

export const BlinkPlainReaction: React.FC<Props> = ({
  plainReactionId,
  playSoundEffect = false,
  quiteCallback,
  ...styleProps
}) => {
  const { stampProps, animate } = useBlinkPlainReactionState(plainReactionId, playSoundEffect, quiteCallback);
  return (
    <BlinkPlainReactionStyle {...styleProps} animate={animate}>
      <StampStyle {...stampProps} color="black" size="L" />
    </BlinkPlainReactionStyle>
  );
};
