import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import React from "react";
import { ToggleStyle, ToggleStyleProps, IconStyleProps } from "./ToggleStyle";

type Props = ToggleStyleProps & {
  Icon?: React.ComponentType<IconProps>; //引き数タイプの定義
};

export const Toggle: React.FC<Props> = ({ Icon, ...styleProps }) => {
  return <ToggleStyle {...styleProps}>{Icon && <Icon {...IconStyleProps(styleProps)} />}</ToggleStyle>;
};
