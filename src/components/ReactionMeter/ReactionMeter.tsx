import { BlinkPlainReaction } from "components/BlinkPlainReaction/BlinkPlainReaction";
import { Iine, Psycho, Tyottomate } from "components/icons";
import React, { forwardRef, useImperativeHandle } from "react";
import { ReactionMeterHandler, useReactionMeterState } from "./hooks/useReactionMeterState";
import {
  IconStyleProps,
  ReactionMeterBgStyle,
  ReactionMeterStyle,
  ReactionMeterStyleProps,
} from "./ReactionMeterStyle";

export type ReactionMeterProps = ReactionMeterStyleProps & {};

// eslint-disable-next-line react/display-name
export const ReactionMeter = forwardRef<ReactionMeterHandler, ReactionMeterProps>(({ ...styleProps }, ref) => {
  const { strokeDashoffset, showStamp, blinkPlainReactions } = useReactionMeterState();

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
    <ReactionMeterStyle {...styleProps}>
      <div className="reactionmeter_meter">
        <div className="reactionmeter_bg" />
        <svg viewBox="0 0 136 136" className="reactionmeter_gause">
          <circle
            className="reactionmeter_gause_line"
            cx="0"
            cy="0"
            r="48"
            transform="translate(68 68) rotate(150 0 0)"
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <ReactionMeterBgStyle src="/img/reactionmeter_bg.svg" wrapper="svg" />
        <div className="reactionmeter_border" />
      </div>
      <div className="reactionmeter_main">
        <div className="reactionmeter_top">
          {styleProps.type == "psycho" && (
            <>
              <Psycho {...IconStyleProps(styleProps)} />
              <span>PSYCHO</span>
            </>
          )}
          {styleProps.type == "wait" && (
            <>
              <Tyottomate {...IconStyleProps(styleProps)} />
              <span>WAIT</span>
            </>
          )}
          {styleProps.type == "good" && (
            <>
              <Iine {...IconStyleProps(styleProps)} />
              <span>GOOD</span>
            </>
          )}
        </div>
        <div className="reactionmeter_stamp">
          {Object.keys(blinkPlainReactions).map((key) => (
            <BlinkPlainReaction key={key} {...blinkPlainReactions[key]} />
          ))}
        </div>
        <div className="reactionmeter_bottom">
          <span></span>
        </div>
      </div>
    </ReactionMeterStyle>
  );
});
