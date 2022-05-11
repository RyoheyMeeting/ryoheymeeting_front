import React from "react";
import { ONAIRStyle, ONAIRStyleProps } from "./ONAIRStyle";

type Props = ONAIRStyleProps & {};

export const ONAIR: React.FC<Props> = ({ ...styleProps }) => {
  return <ONAIRStyle {...styleProps}>ON AIR</ONAIRStyle>;
};
