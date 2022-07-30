import { BlinkPlainReaction } from "components/BlinkPlainReaction/BlinkPlainReaction";
import { UserIcon } from "components/UserIcon/UserIcon";
import React from "react";
import { dateToTime } from "Utils/funcs";
import { useLiveState } from "./hooks/useLiveState";
import { LiveFrameBottomStyle, LiveFrameTopStyle, LiveStyle, LiveStyleProps } from "./LiveStyle";

type Props = LiveStyleProps & {};

export const Live: React.FC<Props> = ({ ...styleProps }) => {
  const { currentPresenter, remainTime, blinkPlainReactions } = useLiveState();

  return (
    <LiveStyle {...styleProps}>
      <div className="live_reactions">
        {Object.keys(blinkPlainReactions).map((key) => (
          <BlinkPlainReaction key={key} {...blinkPlainReactions[key]} playSoundEffect={true} />
        ))}
      </div>
      <LiveFrameTopStyle src="/img/live_frame_top.svg" wrapper="div" />
      <LiveFrameBottomStyle src="/img/live_frame_bottom.svg" wrapper="div" />
      <div className="live_presenter_info" onClick={() => new Audio("/sounds/stampse_example.wav").play()}>
        {currentPresenter ? (
          <>
            <span className="live_presenter_username">{currentPresenter?.user?.displayName || "発表者"}</span>
            <UserIcon
              userName={currentPresenter?.user?.displayName}
              iconUrl={currentPresenter.user?.photoURL}
              size="LIVE"
              color="orange"
            />
            <span className="live_timer">{remainTime ? dateToTime(remainTime) : "--:--"}</span>
          </>
        ) : (
          <span className="live_presenter_message">休憩中</span>
        )}
      </div>
      <div className="live_meter"></div>
    </LiveStyle>
  );
};
