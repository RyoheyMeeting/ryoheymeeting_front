import React from "react";
import { StampPalleteStyle, StampPalleteStyleProps } from "./StampPalleteStyle";

type Props = StampPalleteStyleProps & {};

export const StampPallete: React.FC<Props> = ({ children, ...styleProps }) => {
  return <StampPalleteStyle {...styleProps}>{children}</StampPalleteStyle>;
};
