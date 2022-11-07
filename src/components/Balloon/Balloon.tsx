import React from "react";
import { BalloonStyle, BalloonStyleProps, BalloonTriStyle } from "./BalloonStyle";

type Props = BalloonStyleProps & {
};

export const Balloon: React.FC<Props> = ({ children, ...styleProps }) => {
  return (
    <BalloonStyle {...styleProps}>
      <div className="balloon_tri">
        <BalloonTriStyle src="/img/balloon_tri.svg" wrapper="svg" {...styleProps} />
      </div>
      <div className="balloon_main">
        {children}
      </div>
    </BalloonStyle>
  );
};
