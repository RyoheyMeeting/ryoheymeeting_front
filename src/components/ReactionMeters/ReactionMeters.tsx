import React from "react";
import {
  ReactionMetersStyle,
  ReactionMetersStyleProps,
  ReactionMetersBgStyle,
  PsychoReactionMeterStyle,
  WaitReactionMeterStyle,
  GoodReactionMeterStyle,
} from "./ReactionMetersStyle";

type Props = ReactionMetersStyleProps & {};

export const ReactionMeters: React.FC<Props> = ({ ...styleProps }) => {
  return (
    <ReactionMetersStyle {...styleProps}>
      <div className="reactionmeters_wrapper">
        <ReactionMetersBgStyle src="/img/reactionmeters_bg.svg" wrapper="svg" />
        <PsychoReactionMeterStyle type="psycho" />
        <WaitReactionMeterStyle type="wait" />
        <GoodReactionMeterStyle type="good" />
      </div>
    </ReactionMetersStyle>
  );
};
