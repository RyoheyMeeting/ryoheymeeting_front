import React from "react";
import { IconStyleProps, NavIconTextStyle, NavIconTextStyleProps } from "./NavIconTextStyle";
import { To } from "react-router-dom";
import { Icon } from "Types/Utils";

type Props = NavIconTextStyleProps & {
  to: To;
  Icon: Icon;
  text: string;
};

export const NavIconText: React.FC<Props> = ({ to, Icon, text, ...styleProps }) => {
  return (
    <NavIconTextStyle to={to} {...styleProps}>
      <Icon {...IconStyleProps({ ...styleProps })} />
      <span className="icontext_label">{text}</span>
    </NavIconTextStyle>
  );
};
