import React from "react";
import { StampPalleteGroupStyle, StampPalleteGroupStyleProps } from "./StampPalleteGroupStyle";

type Props = StampPalleteGroupStyleProps & {};

export const StampPalleteGroup: React.FC<Props> = ({ children, ...styleProps }) => {
  return <StampPalleteGroupStyle {...styleProps}>{children}</StampPalleteGroupStyle>;
};
