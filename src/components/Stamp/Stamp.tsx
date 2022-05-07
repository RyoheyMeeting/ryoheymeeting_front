import React from "react";
import { StampStyle, StampStyleProps } from "./StampStyle";

type Props = StampStyleProps & {
  stampName?: string;
  stampUrl?: string;
};

export const Stamp: React.FC<Props> = ({ stampName = "STAMP", stampUrl, ...styleProps }) => {
  return (
    <StampStyle {...styleProps}>
      <img className="stamp_image" src={stampUrl} alt={stampName} />
    </StampStyle>
  );
};
