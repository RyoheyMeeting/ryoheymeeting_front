import React, { ComponentType } from "react";
import { IconStyleProps, IconTextStyle, IconTextStyleProps } from "./IconTextStyle";
import { IconProps } from "components/icons/components/IconPrototype/IconPrototype";
import { To } from "react-router-dom";

type Props = IconTextStyleProps & {
  to: To;
  Icon: ComponentType<IconProps>;
  text: string;
};

export const IconText: React.FC<Props> = ({ to, Icon, text, ...styleProps }) => {
  return (
    <IconTextStyle to={to} {...styleProps}>
      <Icon {...IconStyleProps({ ...styleProps })} />
      <span className="icontext_label">{text}</span>
    </IconTextStyle>
  );
};
