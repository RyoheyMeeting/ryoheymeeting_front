import React from "react";
import { LiveStyle, LiveStyleProps } from "./LiveStyle";

type Props = LiveStyleProps & {};

export const Live: React.FC<Props> = ({ ...styleProps }) => {
  return <LiveStyle {...styleProps}>ライブページ</LiveStyle>;
};
