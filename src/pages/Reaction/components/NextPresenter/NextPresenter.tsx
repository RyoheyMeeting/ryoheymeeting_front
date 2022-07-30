import { Question } from "components/icons";
import React from "react";
import { useNextPresenterState } from "./hooks/useNextPresenterState";
import {
  NextPresenterSideStyle,
  NextPresenterStyle,
  NextPresenterStyleProps,
  QuestionStyleProps,
} from "./NextPresenterStyle";

type Props = NextPresenterStyleProps & {
  introduction: string | undefined;
};

export const NextPresenter: React.FC<Props> = ({ introduction, ...styleProps }) => {
  const { durationTime, isAnimate } = useNextPresenterState(introduction || "");
  return (
    <NextPresenterStyle {...styleProps} durationTime={durationTime}>
      <div className="nextpresenter_icon">
        <Question {...QuestionStyleProps(styleProps)} />
      </div>
      <div className="nextpresenter_main">
        <NextPresenterSideStyle src="/img/nextpresenter_side.svg" wrapper="svg" />
        <div className="nextpresenter_value">
          <span>次のプレゼンターは...</span>
          <div className="nextpresenter_introduction">
            <span className={isAnimate ? "" : "nextpresenter_no_animation"}>{introduction || "いません！"}</span>
          </div>
        </div>
      </div>
    </NextPresenterStyle>
  );
};
