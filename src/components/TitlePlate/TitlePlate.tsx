import React from "react";
import { TitlePlateBGSideStyle, TitlePlateSideStyle, TitlePlateStyle, TitlePlateStyleProps } from "./TitlePlateStyle";

type Props = TitlePlateStyleProps & {
  title: string;
};

export const TitlePlate: React.FC<Props> = ({ title, ...styleProps }) => {
  return (
    <TitlePlateStyle {...styleProps}>
      <div className="titleplate_bg">
        <TitlePlateBGSideStyle src="/img/titleplate_bg_side.svg" wrapper="svg" />
        <div className="titleplate_spacer" />
        <TitlePlateBGSideStyle className="reverse" src="/img/titleplate_bg_side.svg" wrapper="svg" />
      </div>
      <div className="titleplate_main">
        <TitlePlateSideStyle src="/img/titleplate_side.svg" wrapper="svg" />
        <div className="titleplate_title">
          <span>{title}</span>
        </div>
        <TitlePlateSideStyle className="reverse" src="/img/titleplate_side.svg" wrapper="svg" />
      </div>
    </TitlePlateStyle>
  );
};
