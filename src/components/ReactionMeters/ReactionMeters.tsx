import React, { forwardRef, useImperativeHandle } from "react";
import { ReactionMetersHandler, useReactionMetersState } from "./hooks/useReactionMetersState";
import {
  ReactionMetersStyle,
  ReactionMetersStyleProps,
  ReactionMetersBgStyle,
  PsychoReactionMeterStyle,
  WaitReactionMeterStyle,
  GoodReactionMeterStyle,
} from "./ReactionMetersStyle";

export type ReactionMetersProps = ReactionMetersStyleProps & {};

// eslint-disable-next-line react/display-name
export const ReactionMeters = forwardRef<ReactionMetersHandler, ReactionMetersProps>(({ ...styleProps }, ref) => {
  const { showStamp, psychoReactionMeterRef, waitReactionMeterRef, goodReactionMeterRef } = useReactionMetersState();

  // Refで実行できる関数をセット
  useImperativeHandle(
    ref,
    () => {
      return {
        showStamp,
      };
    },
    [showStamp]
  );

  return (
    <ReactionMetersStyle {...styleProps}>
      <div className="reactionmeters_wrapper">
        <ReactionMetersBgStyle src="/img/reactionmeters_bg.svg" wrapper="svg" />
        <PsychoReactionMeterStyle type="psycho" ref={psychoReactionMeterRef} />
        <WaitReactionMeterStyle type="wait" ref={waitReactionMeterRef} />
        <GoodReactionMeterStyle type="good" ref={goodReactionMeterRef} />
      </div>
    </ReactionMetersStyle>
  );
});
