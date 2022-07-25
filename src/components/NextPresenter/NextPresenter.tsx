import { Question } from "components/icons";
import React from "react";
import { useNextPresenterState } from "./hooks/useNextPresenterState";
import { IconStyleProps, NextPresenterBG, NextPresenterStyle, NextPresenterStyleProps } from "./NextPresenterStyle";

type Props = NextPresenterStyleProps & {
  introduction?: string;
};

export const NextPresenter: React.FC<Props> = ({ introduction, ...styleProps }) => {
  const { durationTime, isAnimate } = useNextPresenterState(introduction || "");
  return (
    <NextPresenterStyle {...styleProps} durationTime={durationTime}>
      <div className="nextpresenter_container_icon">
        <Question {...IconStyleProps(styleProps)} />
      </div>
      <div className="nextpresenter_container_main">
        <div className="nextpresenter_container_message">
          <span>次のプレゼンターは...</span>
          <div className="nextpresenter_introduction">
            <span className={isAnimate ? "" : "nextpresenter_no_animation"}>{introduction}</span>
          </div>
        </div>
        <NextPresenterBG src="/img/next_presenter_bg.svg" wrapper="svg" />
      </div>
    </NextPresenterStyle>
  );
};
