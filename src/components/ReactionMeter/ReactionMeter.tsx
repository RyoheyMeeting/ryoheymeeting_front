import { Iine, Psycho, Tyottomate } from "components/icons";
import React from "react";
import { BlinkStamp } from "./components/BlinkStamp/BlinkStamp";
import { useReactionMeterState } from "./hooks/useReactionMeterState";
import {
  IconStyleProps,
  ReactionMeterBgStyle,
  ReactionMeterStyle,
  ReactionMeterStyleProps,
} from "./ReactionMeterStyle";

type Props = ReactionMeterStyleProps & {};

export const ReactionMeter: React.FC<Props> = ({ ...styleProps }) => {
  const { strokeDashoffset, blinkStamps } = useReactionMeterState();
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
          {Object.keys(blinkStamps).map((key) => (
            <BlinkStamp key={key} {...blinkStamps[key]} />
          ))}
        </div>
        <div className="reactionmeter_bottom">
          <span>80km/h</span>
        </div>
      </div>
    </ReactionMeterStyle>
  );
};
