import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import React from "react";
import { ToggleStyle, ToggleStyleProps, IconStyleProps } from "./ToggleStyle";

type Props = ToggleStyleProps & {
  Icon?: React.ComponentType<IconProps>; //引き数タイプの定義
  onClick?: React.MouseEventHandler;
};

export const Toggle: React.FC<Props> = ({ Icon, onClick, ...styleProps }) => {
  return (
    <ToggleStyle {...styleProps} onClick={onClick}>
      {Icon && <Icon {...IconStyleProps(styleProps)} />}
    </ToggleStyle>
  );
};
