import React from "react";
import { IconStyleProps, NavIconTextStyle } from "./NavIconTextStyle";
import { To } from "react-router-dom";
import { Icon } from "Types/Utils";

type Props = {
  to: To;
  Icon: Icon;
  text: string;
};

export const NavIconText: React.FC<Props> = ({ to, Icon, text }) => {
  return (
    <NavIconTextStyle to={to}>
      <Icon {...IconStyleProps()} />
      <span className="icontext_label">{text}</span>
    </NavIconTextStyle>
  );
};
