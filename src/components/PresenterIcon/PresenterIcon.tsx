import { UseTimerProps } from "hooks/Timer/useTimer";
import React from "react";
import { useImage } from "react-image";
import { dateToTime } from "Utils/funcs";
import { usePresenterIconState } from "./hooks/usePresenterIconState";
import { PresenterIconStyle, PresenterIconStyleProps, UserPhotoAltStyle } from "./PresenterIconStyle";

type Props = PresenterIconStyleProps & {
  photoUrl?: string;
  presenterName?: string;
  timerProps?: UseTimerProps;
};

export const PresenterIcon: React.FC<Props> = ({
  photoUrl,
  presenterName,
  timerProps = {
    maxTime: new Date(60000),
    startTime: new Date(),
  },
  ...styleProps
}) => {
  const { storkeDashoffset, remainTime } = usePresenterIconState(timerProps);
  const { src, isLoading, error } = useImage({ srcList: [photoUrl || ""], useSuspense: false });
  return (
    <PresenterIconStyle {...styleProps}>
      <div className="presenter_container_main">
        <div className="presenter_container_photo">
          {!error ? (
            isLoading ? (
              <div className="presenter_photo_loading" />
            ) : (
              <img className="presenter_photo" src={src} alt="presenter" />
            )
          ) : (
            <UserPhotoAltStyle userName={presenterName} size="100%" />
          )}
          <div className="presenter_top_cover" />
          <div className="presenter_bottom_cover" />
        </div>
        <span className="presenter_label">Presenter</span>
        <span className="presenter_name">{presenterName}</span>
        <div className="presenter_spacer" />
        <div className="presenter_container_timer">{dateToTime(remainTime)}</div>
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
