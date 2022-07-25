import React from "react";
import { usePresenterIconState } from "./hooks/usePresenterIconState";
import { PresenterIconStyle, PresenterIconStyleProps } from "./PresenterIconStyle";

type Props = PresenterIconStyleProps & {
  photoUrl?: string;
  presenterName?: string;
  maxTime?: Date;
  time?: Date;
};

export const PresenterIcon: React.FC<Props> = ({
  photoUrl,
  presenterName,
  maxTime = new Date(10),
  time = new Date(10),
  ...styleProps
}) => {
  const { storkeDashoffset, remainTime } = usePresenterIconState(maxTime, time);
  return (
    <PresenterIconStyle {...styleProps}>
      <div className="presenter_container_main">
        <div className="presenter_container_photo">
          <img className="presenter_photo" src={photoUrl} alt="presenter" />
          <div className="presenter_top_cover" />
          <div className="presenter_bottom_cover" />
        </div>
        <span className="presenter_label">Presenter</span>
        <span className="presenter_name">{presenterName}</span>
        <div className="presenter_spacer" />
        <div className="presenter_container_timer">{remainTime.toISOString().slice(14, 19)}</div>
      </div>
      <svg viewBox="0 0 100 100" className="circle">
        <circle className="presenter_bg_line" cx="50" cy="50" r="49.8" />
        <circle
          className="presenter_remain_line"
          cx="50"
          cy="50"
          r="48"
          transform="rotate(90 0 0) scale(-1 1) translate(-100 -100)"
          strokeDashoffset={storkeDashoffset}
        />
      </svg>
    </PresenterIconStyle>
  );
};
