import React from "react";
import { SpeechBalloonStyle, SpeechBalloonStyleProps, SpeechBalloonTriStyle } from "./SpeechBalloonStyle";

type Props = SpeechBalloonStyleProps & {
  text: string;
};

export const SpeechBalloon: React.FC<Props> = ({ text, ...styleProps }) => {
  return (
    <SpeechBalloonStyle {...styleProps}>
      <SpeechBalloonTriStyle src="/img/speechballoon_tri.svg" wrapper="svg" />
      <div className="speechballoon_main">
        <span className="speechballoon_text">{text}</span>
      </div>
    </SpeechBalloonStyle>
  );
};
