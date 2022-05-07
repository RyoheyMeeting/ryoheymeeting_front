import React from "react";
import { ToggleStyle, ToggleStyleProps } from "./ToggleStyle";

type Props = ToggleStyleProps & {
  icon?: React.ReactElement; //引き数タイプの定義
};

export const Toggle: React.FC<Props> = ({ icon, ...styleProps }) => {
  return <ToggleStyle {...styleProps}>{icon}</ToggleStyle>;
};
